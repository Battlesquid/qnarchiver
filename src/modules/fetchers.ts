import { Constants } from "./constants";
import { Logger } from "pino";
import { Question, Season } from "../types";
import { extractPageCount, extractQuestion, extractPageQuestions, unleak } from "./extractors";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, buildHomeQnaUrl, buildQnaUrlWithPage } from "./parsing";
import { getScrapingClient, sleep, nsToMsElapsed, attempt, AttemptResult } from "../util";

export type HtmlResponse = {
    html: string;
    url: string;
};

/**
 *
 * @param url The url to get
 * @param logger Optional {@link Logger}
 * @returns The html for the given url. Also returns the final response url, which is useful in the case of redirects
 */
export const getHtml = async (url: string, logger?: Logger): Promise<HtmlResponse | null> => {
    logger?.trace(`Fetching HTML from ${url}.`);
    const client = getScrapingClient();
    const response = await client.fetch(url, { logger });
    if (!response.ok) {
        logger?.trace(`Fetch for ${url} returned ${response.statusCode}: ${response.statusMessage}`, {
            url,
            status: response.statusCode
        });
        return null;
    }
    return {
        url: response.url,
        html: unleak(response.body)
    };
};

/**
 * Fetches the page count for the given Q&A
 * @param url The Q&A to fetch the page count from
 * @param logger Optional {@link Logger}
 * @returns The page count for the given Q&A
 */
export const fetchPageCount = async (url: QnaHomeUrl, logger?: Logger): Promise<number | null> => {
    const html = await getHtml(url);
    if (html === null) {
        return null;
    }
    const pageCount = extractPageCount({
        url: html.url as QnaHomeUrl,
        html: html.html
    });
    logger?.trace(
        {
            label: "fetchPageCount",
            pageCount,
            url
        },
        `Page count for ${url}: ${pageCount}`
    );
    return pageCount;
};

/**
 * Checks whether a Q&A for a given program and seasons exists
 * @param program The program of the Q&A to ping
 * @param season The season of the Q&A to ping
 * @param logger Optional {@link Logger}
 * @returns true if the Q&A exists, false if it does not
 */
export const pingQna = async (program: string, season: string, logger?: Logger): Promise<boolean> => {
    const url = buildHomeQnaUrl({ program, season });
    const client = getScrapingClient();
    const ok = client.ping(url, { logger });
    logger?.trace({
        exists: ok,
        label: "pingQna",
        program,
        season
    });
    return ok;
};

/**
 * Fetches data for a given Q&A
 * @param url The url of the Q&A
 * @param logger Optional {@link Logger}
 * @returns The Q&A data from the page
 */
export const fetchQuestion = async (url: QnaIdUrl, logger?: Logger): Promise<Question | null> => {
    const html = await getHtml(url, logger);
    if (html === null) {
        return null;
    }
    return extractQuestion({ url: html.url as QnaIdUrl, html: html.html });
};

/**
 * Fetches the current season.
 * @param logger Optional {@link Logger}
 * @returns The current season
 */
export const fetchCurrentSeason = async (logger?: Logger): Promise<Season> => {
    const newSeason = await pingQna("V5RC", `${Constants.CURRENT_YEAR}-${Constants.CURRENT_YEAR + 1}`);
    const currentSeason: Season = newSeason ? `${Constants.CURRENT_YEAR}-${Constants.CURRENT_YEAR + 1}` : `${Constants.CURRENT_YEAR - 1}-${Constants.CURRENT_YEAR}`;
    logger?.trace(
        {
            label: "fetchCurrentSeason",
            currentSeason
        },
        `Current season: ${currentSeason}`
    );
    return currentSeason;
};

/**
 * Generates a list of all seasons to date
 * @param logger Optional {@link Logger}
 * @returns A list of all seasons to date
 */
export const fetchAllSeasons = async (logger?: Logger): Promise<Season[]> => {
    const allSeasons: Season[] = [];
    const [start] = (await fetchCurrentSeason()).split("-");
    const startYear = parseInt(start);
    for (let year = 2018; year <= startYear; year++) {
        allSeasons.push(`${year}-${year + 1}`);
    }
    logger?.trace({ allSeasons }, "Fetched all seasons");
    return allSeasons;
};

/**
 * Generates a list of urls with the given program and list of seasons
 * @param program The program to generate pages with
 * @param seasons The seasons to generate pages with
 * @param logger Optional {@link Logger}
 * @returns A list of urls corresponding to the given program and seasons
 */
export const fetchPagesForSeasons = async (program: string, seasons: Season[], logger?: Logger): Promise<QnaPageUrl[]> => {
    const urls: QnaPageUrl[] = [];
    for (const season of seasons) {
        const url = buildHomeQnaUrl({ program, season });
        const pageCount = await fetchPageCount(url, logger);
        if (pageCount === null) {
            logger?.warn(`Warning: unable to retrieve page count for ${url}`);
            continue;
        }
        for (let page = 1; page <= pageCount; page++) {
            urls.push(buildQnaUrlWithPage({ program, season, page }));
        }
    }
    return urls;
};

export type PageQuestionsResults = [Question[], string[]];

/**
 * Fetches Q&A data from the given url
 * @param url The Q&A page url to extract data from
 * @param logger Optional {@link Logger}
 * @returns Q&A data from the given page
 */
export const fetchQuestionsFromPage = async (url: QnaPageUrl, logger?: Logger): Promise<PageQuestionsResults | null> => {
    const html = await getHtml(url);
    if (html === null) {
        return null;
    }
    const urls = extractPageQuestions({ url: html.url as QnaPageUrl, html: html.html });
    logger?.trace({ urls }, `Extracted ${urls.length} urls from ${url}`);
    const results = await Promise.allSettled(urls.map((u) => fetchQuestion(u, logger)));
    const passed: Question[] = [],
        failed: QnaIdUrl[] = [];
    results.forEach((result, i) => {
        if (result.status === "fulfilled" && result.value !== null) {
            passed.push(result.value);
        } else {
            failed.push(urls[i]);
        }
    });
    return [passed, failed];
};

type Job<T> = {
    name: string;
    job: T;
};

/**
 * Fetches Q&A data from a list of urls
 * @param urls The urls to fetch Q&A data from
 * @param logger Optional {@link Logger}
 * @param interval Time in milliseconds to wait in between requests
 * @returns All Q&A data from the specified pages
 */
export const fetchQuestionsFromPages = async (urls: QnaPageUrl[], logger?: Logger, interval = 1500): Promise<Question[]> => {
    const jobs: Job<Promise<AttemptResult<PageQuestionsResults | null>>>[] = [];
    const startTime = process.hrtime.bigint();

    for (const url of urls) {
        const job = {
            name: url,
            job: attempt({
                attempts: 3,
                callback: () => fetchQuestionsFromPage(url, logger),
                logger
            })
        };
        jobs.push(job);
        await sleep(interval);
    }

    const jobResults = await Promise.all(jobs.map((j) => j.job));
    const elapsed = new Date(nsToMsElapsed(startTime));
    const success: Question[] = [],
        failedQuestions: string[] = [],
        failedPages: string[] = [];
    jobResults.forEach((job, i) => {
        if (job.status === "success" && job.value !== null) {
            const [passed, failed] = job.value;
            success.push(...passed);
            failedQuestions.push(...failed);
        } else {
            failedPages.push(jobs[i].name);
        }
    });

    logger?.info(`${success.length} succeeded, ${failedQuestions.length} questions failed, ${failedPages.length} question pages failed.`, {
        failedQuestions,
        failedPages
    });
    logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);
    return success;
};

const fetchQuestionRange = (ids: number[], logger?: Logger): Promise<Question | null>[] => {
    return ids.map(async (id) => {
        const page = await getHtml(`https://www.robotevents.com/V5RC/2020-2021/QA/${id}`, logger);
        if (page === null) {
            return null;
        }

        return extractQuestion({
            html: page.html,
            url: page.url as QnaIdUrl
        });
    });
};

const ITERATIVE_BATCH_COUNT = 10;
const ITERATIVE_INTERVAL = 10;

export type IterativeFetchResult = {
    /**
     * The last question that was fetched successfully
     */
    last: Question | null;

    /**
     * The first unanswered question that was fetched successfully
     * Useful for calling {@link fetchQuestionsIterative} at a later point,
     * with start set to the question ID.
     */
    lastUnanswered: Question | null;

    /**
     * The list of questions fetched
     */
    questions: Question[];
};

export type IterativeFetchOptions = {
    /**
     * The ID to start scraping questions from
     */
    start?: number;

    /**
     * Optional {@link Logger}
     */
    logger?: Logger;
};

type IterativeBatchResult = {
    questions: Question[];
    last: Question | null;
    lastUnanswered: Question | null;
    failed: boolean;
};

const handleIterativeBatch = (results: PromiseSettledResult<Question | null>[]): IterativeBatchResult => {
    const questions: Question[] = [];
    let failures = 0;
    let last: Question | null = null;
    let lastUnanswered: Question | null = null;
    for (const result of results) {
        if (result.status === "rejected" || result.value === null) {
            failures++;
            continue;
        }
        questions.push(result.value);
        last = result.value;
        if (!result.value.answered) {
            lastUnanswered = result.value;
        }
    }
    return { questions, last, lastUnanswered, failed: failures === results.length };
};

/**
 * Fetches questions iteratively. Instead of generating a list of urls to scrape, we iterate through IDs in batches
 * until a batch fails, resulting in faster scraping. Best for when you want a dump of all Q&As.
 * @param options Options for defining an optional logger and start point
 * @returns Object containing the fecthed Q&As, plus some additional utility data
 */
export const fetchQuestionsIterative = async (options?: IterativeFetchOptions): Promise<IterativeFetchResult> => {
    const start = options?.start !== undefined ? options.start - 1 : 1;
    let batchFailed = false;
    let range = [...Array(ITERATIVE_BATCH_COUNT).keys()].map((n) => start - 1 + n + 1);

    const data: Question[] = [];
    const startTime = process.hrtime.bigint();
    let lastFulfilled: Question | null = null;
    let lastUnansweredFulfilled: Question | null = null;

    while (!batchFailed) {
        options?.logger?.trace(`Scraping question range ${range[0]}-${range.at(-1)}`);
        const results = await Promise.allSettled(fetchQuestionRange(range, options?.logger));
        const { questions, failed, last, lastUnanswered } = handleIterativeBatch(results);
        data.push(...questions);
        lastFulfilled = last;
        if (lastUnansweredFulfilled === null) {
            lastUnansweredFulfilled = lastUnanswered;
        }
        if (failed) {
            options?.logger?.warn(`Batch failed for range ${range[0]}-${range.at(-1)}, exiting`);
            batchFailed = true;
        } else {
            range = range.map((n) => (n += ITERATIVE_INTERVAL));
            await sleep(1500);
        }
    }

    const elapsed = new Date(nsToMsElapsed(startTime));
    options?.logger?.info(`Scraped ${data.length} questions`);
    options?.logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);

    return {
        last: lastFulfilled,
        lastUnanswered: lastUnansweredFulfilled,
        questions: data
    };
};
