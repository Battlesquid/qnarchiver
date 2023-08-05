import NodeCache from "node-cache";
import { Logger } from "pino";
import { Question } from "./generators";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, parseQnaUrlWithId } from "./parsing";
import cheerioModule from "cheerio";
import SELECTORS from "../selectors.json";
import attempt from "../util/attempt";
import fetch from "node-fetch-cache";

export interface CachedScraperOptions {
    logger?: Logger;
}

export interface ScrapedPage<U extends string = string> {
    url: U;
    html: string;
}

export class CachedScraper {
    private logger?: Logger;
    private cache: NodeCache;

    constructor(options?: CachedScraperOptions) {
        this.logger = options?.logger;
        this.cache = new NodeCache();
    }

    async getPageCount(url: QnaHomeUrl, logger?: Pick<Logger, "trace">): Promise<number> {
        const pageCount = this.extractPageCount({
            url,
            html: await this.getHtml(url)
        });
        logger?.trace(`Page count for ${url}: ${pageCount}`);
        return pageCount;
    }

    extractPageCount({ html }: ScrapedPage<QnaHomeUrl>): number {
        const $ = cheerioModule.load(html);
        const el = $(SELECTORS.PAGE_COUNT);
        return Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());
    }

    async getQuestion(url: QnaIdUrl): Promise<Question> {
        const cached = this.cache.get<Question>(url);
        if (cached !== undefined) {
            this.logger?.trace(`Returning cached value for ${url}.`);
            return cached;
        }

        this.logger?.trace(`${url} not in cache, fetching.`);
        return this.extractQuestion({
            url,
            html: await this.getHtml(url)
        });
    }

    extractQuestion({ html, url }: ScrapedPage<QnaIdUrl>): Question {
        const $ = cheerioModule.load(html);

        const { id, program, season } = parseQnaUrlWithId(url);
        const author = this.selectHtml($, SELECTORS.AUTHOR);
        const title = this.selectHtml($, SELECTORS.TITLE);
        const question = this.selectHtml($, SELECTORS.QUESTION);
        const answer = this.selectHtml($, SELECTORS.ANSWER);
        const askedTimestamp = this.selectHtml($, SELECTORS.ASKED_TIMESTAMP);
        const askedTimestampMs = new Date(askedTimestamp).getTime();
        const answeredTimestamp = this.selectHtml($, SELECTORS.ANSWERED_TIMESTAMP);
        const answeredTimestampMs = new Date(answeredTimestamp).getTime();
        const answered = Boolean(answer);
        const tags = $(SELECTORS.TAGS)
            .map((_i, el) => this.unleak($(el).text().trim()))
            .get();

        const data: Question = {
            id,
            url,
            program,
            season,
            author,
            title,
            question,
            answer,
            askedTimestamp,
            askedTimestampMs,
            answeredTimestamp,
            answeredTimestampMs,
            answered,
            tags
        };

        this.cache.set(url, data);

        return data;
    }

    async scrapePages(pages: QnaPageUrl[], interval = 1500): Promise<Question[]> {
        const questions: Record<string, Promise<Question>> = {};

        const sleep = (ms: number): Promise<void> => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        };

        const handlePage = async (url: QnaPageUrl): Promise<void> => {
            const urls = this.extractQuestionUrls({
                url,
                html: await this.getHtml(url)
            });
            urls.forEach((url) => {
                const { id } = parseQnaUrlWithId(url);
                if (!questions[id]) {
                    questions[id] = this.getQuestion(url);
                }
            });
        };

        const startTime = Date.now();
        for (const url of pages) {
            attempt({
                callback: async () => handlePage(url),
                onFail: (e) => {
                    this.logger?.warn(`Failed to handle ${url}: ${e}`);
                },
                logger: this.logger,
                attempts: 3
            });
            await sleep(interval);
        }

        const questionKeys = Object.keys(questions);
        const questionValues = Object.values(questions);
        const results = await Promise.allSettled(questionValues);
        const elapsed = new Date(Date.now() - startTime);
        const success: Question[] = [],
            failed: string[] = [];
        results.forEach((result, i) => {
            if (result.status === "fulfilled") {
                success.push(result.value);
            } else {
                failed.push(questionKeys[i]);
            }
        });

        this.logger?.info(`${success.length} succeeded, ${failed.length} failed.`, { failed });
        this.logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);
        return success;
    }

    extractQuestionUrls({ html }: ScrapedPage<QnaPageUrl>): QnaIdUrl[] {
        const $ = cheerioModule.load(html);
        return $(SELECTORS.URLS)
            .toArray()
            .map((el) => $(el).attr("href"))
            .filter((s): s is QnaIdUrl => s !== undefined);
    }

    private async getHtml(url: string): Promise<string> {
        this.logger?.trace(`Fetching HTML from ${url}.`);
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Fetch ${url} returned ${response.status}: ${response.statusText}`);
        }
        return this.unleak(await response.text());
    }

    private selectHtml($: cheerio.Root, selector: string | cheerio.Element): string {
        return this.unleak(this.unformat($(selector).text()));
    }

    private unformat(str: string): string {
        return str
            .split(/\n/g)
            .map((n) => n.trim())
            .filter(Boolean)
            .join("");
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=2869
    private unleak(str: string | undefined): string {
        return (" " + str).slice(1);
    }
}
