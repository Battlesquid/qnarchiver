import { Constants } from "./constants";
import { Logger } from "pino";
import { Question, Season } from "../types";
import { AttemptResult, attempt, nsToMsElapsed, sleep } from "../util";
import { extractPageCount, extractQuestion, extractPageQuestions, unleak } from "./extractors";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, buildHomeQnaUrl, buildQnaUrlWithPage } from "./parsing";
import fetch from "node-fetch";

type HtmlResponse = {
    redirected: boolean;
    html: string;
    url: string;
};

export const getHtml = async (url: string, logger?: Logger): Promise<HtmlResponse | null> => {
    logger?.trace(`Fetching HTML from ${url}.`);
    const response = await fetch(url);
    if (!response.ok) {
        logger?.error(`Fetch for ${url} returned ${response.status}: ${response.statusText}`, {
            url,
            status: response.status
        });
        return null;
    }
    return {
        redirected: response.redirected,
        url: response.url,
        html: unleak(await response.text())
    };
};

export const fetchPageCount = async (url: QnaHomeUrl, logger?: Logger): Promise<number | null> => {
    const html = await getHtml(url);
    if (html === null) {
        return null;
    }
    const pageCount = extractPageCount({
        url,
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

export const pingQna = async (program: string, season: string, logger?: Logger): Promise<boolean> => {
    const url = buildHomeQnaUrl({ program, season });
    const response = await fetch(url);
    logger?.trace({
        exists: response.ok,
        label: "pingQna",
        program,
        season
    });
    return response.ok;
};

export const fetchQuestion = async (url: QnaIdUrl): Promise<Question | null> => {
    const html = await getHtml(url);
    if (html === null) {
        return null;
    }
    return extractQuestion({ url, html: html.html });
};

export const fetchCurrentSeason = async (logger?: Logger): Promise<Season> => {
    const newSeason = await pingQna("VRC", `${Constants.CURRENT_YEAR}-${Constants.CURRENT_YEAR + 1}`);
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

export const fetchPagesForSeasons = async (program: string, seasons: Season[], logger?: Logger): Promise<QnaPageUrl[]> => {
    const urls: QnaPageUrl[] = [];
    for (const season of seasons) {
        const url = buildHomeQnaUrl({ program, season });
        const pageCount = await fetchPageCount(url, logger);
        if (pageCount === null) {
            logger?.warn(`Warning: unable to retreive page count for ${url}`);
            continue;
        }
        for (let page = 1; page <= pageCount; page++) {
            urls.push(buildQnaUrlWithPage({ program, season, page }));
        }
    }
    return urls;
};

type PageQuestionsResults = [Question[], string[]];

export const fetchQuestionsFromPage = async (url: QnaPageUrl, logger?: Logger): Promise<PageQuestionsResults | null> => {
    const html = await getHtml(url);
    if (html === null) {
        return null;
    }
    const urls = extractPageQuestions({ url, html: html.html });
    logger?.trace({ urls }, `Extracted ${urls.length} urls from ${url}`);
    const results = await Promise.allSettled(urls.map(fetchQuestion));
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

export const fetchQuestionsFromPages = async (urls: QnaPageUrl[], logger?: Logger, interval = 1500): Promise<Question[]> => {
    const jobs: Job<Promise<AttemptResult<PageQuestionsResults | null>>>[] = [];
    const startTime = process.hrtime.bigint();

    for (const url of urls) {
        const job = {
            name: url,
            job: attempt({
                attempts: 3,
                callback: () => fetchQuestionsFromPage(url),
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
        const page = await getHtml(`https://www.robotevents.com/VRC/2020-2021/QA/${id}`, logger);
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

export const fetchQuestionsIterative = async (logger?: Logger): Promise<Question[]> => {
    let batchFailed = false;
    let range = [...Array(ITERATIVE_BATCH_COUNT).keys()].map((n) => n + 1);

    const data: Question[] = [];
    const startTime = process.hrtime.bigint();
    while (!batchFailed) {
        logger?.trace(`Scraping question range ${range[0]}-${range.at(-1)}`);
        const results = await Promise.allSettled(fetchQuestionRange(range, logger));
        let failures = 0;
        for (const result of results) {
            if (result.status === "fulfilled" && result.value !== null) {
                data.push(result.value);
            } else {
                failures++;
            }
        }
        if (failures === ITERATIVE_BATCH_COUNT) {
            logger?.warn(`Batch failed for range ${range[0]}-${range.at(-1)}, exiting`);
            batchFailed = true;
        } else {
            range = range.map((n) => (n += ITERATIVE_INTERVAL));
        }
        await sleep(1500);
    }

    const elapsed = new Date(nsToMsElapsed(startTime));
    logger?.info(`Scraped ${data.length} questions`);
    logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);

    return data;
};
