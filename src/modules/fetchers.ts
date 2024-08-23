import { Constants } from "./constants";
import { Logger } from "pino";
import { Question, Season } from "../types";
import { extractPageCount, extractQuestion, extractPageQuestions, extractReadOnly } from "./extractors";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, buildHomeQnaUrl, buildQnaUrlWithPage } from "./parsing";
import { sleep, nsToMsElapsed, attempt, AttemptResult } from "../util";
import { FetchClient, FetchClientOptions, FetchClientResponse, getGotClient } from "../clients";

export interface FetcherOptions<T extends FetchClientResponse = FetchClientResponse> {
    client?: FetchClient<T>;
    logger?: Logger;
}

/**
 * Fetches the page count for the given Q&A
 * @param url The Q&A to fetch the page count from
 * @param logger Optional {@link Logger}
 * @returns The page count for the given Q&A
 */
export const fetchPageCount = async (url: QnaHomeUrl, options?: FetcherOptions): Promise<number | null> => {
    const client = options?.client ?? getGotClient();
    const html = await client.getHtml(url);
    if (html === null) {
        return null;
    }
    const pageCount = extractPageCount({
        url,
        html: html.html
    });
    options?.logger?.trace(
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
export const pingQna = async (program: string, season: string, options?: FetcherOptions): Promise<boolean> => {
    const url = buildHomeQnaUrl({ program, season });
    const client = options?.client ?? getGotClient();
    const ok = client.ping(url);
    options?.logger?.trace({
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
export const fetchQuestion = async (url: QnaIdUrl, options?: FetcherOptions): Promise<Question | null> => {
    const client = options?.client ?? getGotClient();
    const html = await client.getHtml(url);
    if (html === null) {
        return null;
    }
    return extractQuestion({ url, html: html.html });
};

/**
 * Fetches the current season.
 * @param logger Optional {@link Logger}
 * @returns The current season
 */
export const fetchCurrentSeason = async (options?: FetchClientOptions): Promise<Season> => {
    const newSeason = await pingQna("V5RC", `${Constants.CURRENT_YEAR}-${Constants.CURRENT_YEAR + 1}`, options);
    const currentSeason: Season = newSeason ? `${Constants.CURRENT_YEAR}-${Constants.CURRENT_YEAR + 1}` : `${Constants.CURRENT_YEAR - 1}-${Constants.CURRENT_YEAR}`;
    options?.logger?.trace(
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
export const fetchPagesForSeasons = async (program: string, seasons: Season[], options?: FetchClientOptions): Promise<QnaPageUrl[]> => {
    const urls: QnaPageUrl[] = [];
    for (const season of seasons) {
        const url = buildHomeQnaUrl({ program, season });
        const pageCount = await fetchPageCount(url, options);
        if (pageCount === null) {
            options?.logger?.warn(`Warning: unable to retrieve page count for ${url}`);
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
export const fetchQuestionsFromPage = async (url: QnaPageUrl, options?: FetchClientOptions): Promise<PageQuestionsResults | null> => {
    const client = getGotClient();
    const html = await client.getHtml(url);
    if (html === null) {
        return null;
    }
    const urls = extractPageQuestions({ url, html: html.html });
    options?.logger?.trace({ urls }, `Extracted ${urls.length} urls from ${url}`);
    const results = await Promise.allSettled(urls.map((u) => fetchQuestion(u, options)));
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
export const fetchQuestionsFromPages = async (urls: QnaPageUrl[], options?: FetchClientOptions, interval = 1500): Promise<Question[]> => {
    const jobs: Job<Promise<AttemptResult<PageQuestionsResults | null>>>[] = [];
    const startTime = process.hrtime.bigint();

    for (const url of urls) {
        const job = {
            name: url,
            job: attempt({
                attempts: 3,
                callback: () => fetchQuestionsFromPage(url, options),
                logger: options?.logger
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

    options?.logger?.info(
        {
            failedQuestions,
            failedPages
        },
        `${success.length} succeeded, ${failedQuestions.length} questions failed, ${failedPages.length} question pages failed.`
    );
    options?.logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);
    return success;
};

export const fetchQuestionRange = (ids: number[]): Promise<Question | null>[] => {
    return ids.map(async (id) => {
        const client = getGotClient();
        const page = await client.getHtml(`https://www.robotevents.com/V5RC/2020-2021/QA/${id}`);
        if (page === null) {
            return null;
        }

        return extractQuestion({
            html: page.html,
            url: page.url as QnaIdUrl
        });
    });
};

export const ITERATIVE_BATCH_COUNT = 10;
export const ITERATIVE_INTERVAL = 10;

export type IterativeFetchResult = {
    /**
     * The list of questions fetched
     */
    questions: Question[];

    /**
     * The ids of the questions that could not be retrieved
     */
    failures: string[];
};

export type IterativeFetchOptions = FetchClientOptions & {
    /**
     * The ID to start scraping questions from
     */
    start?: number;
};

export type IterativeBatchResult = {
    questions: Question[];
    failed: boolean;
    failures: string[];
};

export const handleIterativeBatch = (range: number[], results: PromiseSettledResult<Question | null>[]): IterativeBatchResult => {
    const questions: Question[] = [];
    const failures: string[] = [];
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "rejected" || result.value === null) {
            failures.push(`${range[i]}`);
            continue;
        }
        questions.push(result.value);
    }
    return { questions, failed: failures.length === results.length, failures };
};

/**
 * Fetches questions iteratively. Instead of generating a list of urls to scrape, we iterate through IDs in batches
 * until a batch fails, resulting in faster scraping. Best for when you want a dump of all Q&As.
 * @param options Options for defining an optional logger and start point
 * @returns Object containing the fecthed Q&As, plus some additional utility data
 */
export const fetchQuestionsIterative = async (options?: IterativeFetchOptions): Promise<IterativeFetchResult> => {
    const start = options?.start !== undefined ? Math.max(options.start, 1) : 1;
    let batchFailed = false;
    let range = [...Array(ITERATIVE_BATCH_COUNT).keys()].map((n) => start + n);

    const questions: Question[] = [];
    const failures: string[] = [];
    const startTime = process.hrtime.bigint();

    while (!batchFailed) {
        options?.logger?.trace(`Scraping question range ${range[0]}-${range.at(-1)}`);
        const results = await Promise.allSettled(fetchQuestionRange(range));
        const { questions: batchQuestions, failed, failures: batchFailures } = handleIterativeBatch(range, results);
        questions.push(...batchQuestions);
        if (failed) {
            options?.logger?.warn(`Batch failed for range ${range[0]}-${range.at(-1)}, exiting`);
            batchFailed = true;
        } else {
            failures.push(...batchFailures);
            range = range.map((n) => n + ITERATIVE_INTERVAL);
            await sleep(1500);
        }
    }

    const elapsed = new Date(nsToMsElapsed(startTime));
    options?.logger?.info(`Scraped ${questions.length} questions`);
    options?.logger?.info(`Failed getting ${failures.length} questions`);
    options?.logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);

    return { questions, failures };
};

export const checkIfReadOnly = async (program: string, season: Season): Promise<boolean | null> => {
    const client = getGotClient();
    const html = await client.getHtml(`https://www.robotevents.com/${program}/${season}/QA/`);
    if (html === null) {
        return null;
    }
    return extractReadOnly({ url: html.url as QnaHomeUrl, html: html.html });
};
