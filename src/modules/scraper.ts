import cheerioModule from "cheerio";
import fetch from "node-fetch";
import { DEFAULT_PROGRAMS, DEFAULT_SEASONS, QnaFilters, Season, validateSeasonsExist } from "..";
import attempt from "../util/attempt";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, buildHomeQnaUrl, buildQnaUrlWithPage, parseQnaUrlWithId } from "./parsing";

export const QUESTION_PROPERTIES: readonly (keyof Question)[] = ["id", "url", "author", "program", "title", "question", "answer", "season", "askedTimestamp", "askedTimestampMs", "answeredTimestamp", "answeredTimestampMs", "answered", "tags"] as const;

export interface Question {
    /**
     * The question's numerical ID.
     */
    id: number;

    /**
     * The url of the question.
     */
    url: string;

    /**
     * The person who asked the question.
     */
    author: string;

    /**
     * The program this question was asked in (e.g., VRC, VEXU, etc).
     */
    program: string;

    /**
     * The title of the question.
     */
    title: string;

    /**
     * The question content.
     */
    question: string;

    /**
     * The answer to the question.
     */
    answer: string;

    /**
     * The season this question was asked in (e.g., 2022-2023).
     */
    season: string;

    /**
     * When this question was asked (in the format DD-Mon-YYYY).
     */
    askedTimestamp: string;

    /**
     * {@link askedTimestamp} in milliseconds.
     */
    askedTimestampMs: number;

    /**
     * When this question was answered (in the format DD-Mon-YYYY).
     */
    answeredTimestamp: string;

    /**
     * {@link answeredTimestamp} in milliseconds.
     */
    answeredTimestampMs: number;

    /**
     * Whether the question was answered.
     */
    answered: boolean;

    /**
     * Tags added to this question.
     */
    tags: string[];

    // /**
    //  * Attachments added to this question.
    //  */
    // attachments: string[];
}

const SELECTORS = {
    URLS: "div.card-body h4.title > a",
    AUTHOR: "div.author",
    TITLE: "div.question > h4",
    QUESTION: "div.content-body",
    ANSWER: "div.answer.approved .content-body",
    ASKED_TIMESTAMP: "div.details:nth-child(3) > div:nth-child(2)",
    ANSWERED_TIMESTAMP: "div.pull-right",
    TAGS: "div.tags a",
    PAGE_COUNT: "nav ul.pagination li:nth-last-child(2)"
} as const;

// https://bugs.chromium.org/p/v8/issues/detail?id=2869
const unleak = (str: string | undefined): string => (" " + str).slice(1);

const unique = <T>(arr: T[]): T[] => arr.filter((a, i) => arr.indexOf(a) === i);

const unformat = (str: string): string => str
    .split(/\n/g)
    .map(n => n.trim())
    .filter(Boolean)
    .join("");

const loadHTML = async (url: string): Promise<cheerio.Root> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(`Fetch ${url} returned ${response.status}: ${response.statusText}`);
    }
    const html = unleak((await response.text()));
    return cheerioModule.load(html);
};

const select = ($: cheerio.Root, selector: string | cheerio.Element): string => {
    return unleak(unformat($(selector).text()));
};

const getPageCount = async (url: QnaHomeUrl): Promise<number> => {
    const $ = await loadHTML(url);
    const el = $(SELECTORS.PAGE_COUNT);
    return Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());
};

/**
 * Fetches data from a single Q&A.
 * @param url The Q&A url to fetch.
 * @returns Relevant data extracted from the Q&A.
 */
export const fetchQuestion = async (url: QnaIdUrl): Promise<Question> => {
    const $ = await loadHTML(url);

    const { id, program, season } = parseQnaUrlWithId(url);
    const author = select($, SELECTORS.AUTHOR);
    const title = select($, SELECTORS.TITLE);
    const question = select($, SELECTORS.QUESTION);
    const answer = select($, SELECTORS.ANSWER);
    const askedTimestamp = select($, SELECTORS.ASKED_TIMESTAMP);
    const askedTimestampMs = new Date(askedTimestamp).getTime();
    const answeredTimestamp = select($, SELECTORS.ANSWERED_TIMESTAMP);
    const answeredTimestampMs = new Date(answeredTimestamp).getTime();
    const answered = Boolean(answer);
    const tags = $(SELECTORS.TAGS)
        .map((_i, el) => unleak($(el).text().trim())).get();

    return {
        id,
        url,
        author,
        program,
        title,
        question,
        answer,
        season,
        askedTimestamp,
        askedTimestampMs,
        answeredTimestamp,
        answeredTimestampMs,
        answered,
        tags
    };
};

const processFilters = async (filters?: QnaFilters): Promise<[string[], Season[][]]> => {
    const programs: string[] = [];
    const seasons: Season[][] = [];

    if (!filters) {
        return [[], []];
    }

    if (Array.isArray(filters)) {
        const uniqueSeasons = unique(filters);
        for (const program of DEFAULT_PROGRAMS) {
            await validateSeasonsExist(program, uniqueSeasons);
            programs.push(program);
            seasons.push(uniqueSeasons);
        }
        return [programs, seasons];
    }

    const entries = Object.entries(filters);
    if (entries.length !== 0) {
        for (const [program, entrySeasons] of entries) {
            const uniqueSeasons = unique(entrySeasons);
            await validateSeasonsExist(program, uniqueSeasons);
            programs.push(program);
            seasons.push(uniqueSeasons);
        }
    } else {
        for (const program of DEFAULT_PROGRAMS) {
            await validateSeasonsExist(program, DEFAULT_SEASONS);
            programs.push(program);
            seasons.push(DEFAULT_SEASONS);
        }
    }

    return [programs, seasons];
};

export const getScrapingUrls = async (filters?: QnaFilters): Promise<QnaPageUrl[]> => {

    const [programs, seasons] = await processFilters(filters);

    const urls: QnaPageUrl[] = [];
    for (let ci = 0; ci < programs.length; ci++) {
        const program = programs[ci];
        const seasonList = seasons[ci];

        for (const season of seasonList) {
            const pageCount = await getPageCount(buildHomeQnaUrl({ program, season }));

            for (let page = 1; page <= pageCount; page++) {
                urls.push(buildQnaUrlWithPage({ program, season, page }));
            }
        }
    }

    return urls;
};

/**
 * Scrapes the provided Q&A pages
 * @param pages A list of Q&A pages to scrape
 * @param interval The rate at which Q&A pages are scraped, in milliseconds
 * @returns A list of {@link Question}s containing the data of the scraped Q&A pages
 */
export const scrapeQnaPages = async (pages: QnaPageUrl[], interval = 1500): Promise<Question[]> => {
    const questions: Record<string, Promise<Question>> = {};

    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const handle = async (page: QnaPageUrl): Promise<void> => {
        const $ = await loadHTML(page);
        const urls = $(SELECTORS.URLS)
            .toArray()
            .map(el => $(el).attr("href"))
            .filter((s): s is QnaIdUrl => Boolean(s));

        urls.forEach(url => {
            const { id } = parseQnaUrlWithId(url);
            if (!questions[id]) {
                questions[id] = fetchQuestion(url);
            }
        });
    };

    for (const page of pages) {
        attempt({
            callback: async () => handle(page),
            onFail: (e) => { throw Error(`Failed to handle ${page}: ${e}`); },
            logError: true,
            attempts: 3
        });
        await sleep(interval);
    }

    return await Promise.all(Object.values(questions));
};
