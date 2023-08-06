import { Logger } from "pino";
import { Question, Season } from "../types";
import { attempt, nsToMsElapsed } from "../util";
import { CURRENT_YEAR } from "./constants";
import { extractPageCount, extractQuestion, extractQuestionUrls, unleak } from "./extractors";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, buildHomeQnaUrl, buildQnaUrlWithPage } from "./parsing";

export const getHtml = async (url: string, logger?: Logger): Promise<string> => {
    logger?.trace(`Fetching HTML from ${url}.`);
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(`Fetch for ${url} returned ${response.status}: ${response.statusText}`);
    }
    return unleak(await response.text());
};

export const fetchPageCount = async (url: QnaHomeUrl, logger?: Logger): Promise<number> => {
    const pageCount = extractPageCount({
        url,
        html: await getHtml(url)
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

export const fetchQuestion = async (url: QnaIdUrl): Promise<Question> => {
    return extractQuestion({
        url,
        html: await getHtml(url)
    });
};

export const fetchCurrentSeason = async (logger?: Logger): Promise<Season> => {
    const newSeason = await pingQna("VRC", `${CURRENT_YEAR}-${CURRENT_YEAR + 1}`);
    const currentSeason: Season = newSeason ? `${CURRENT_YEAR}-${CURRENT_YEAR + 1}` : `${CURRENT_YEAR - 1}-${CURRENT_YEAR}`;
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

export const fetchPagesForSeasons = async (program: string, seasons: Season[]): Promise<QnaPageUrl[]> => {
    const urls: QnaPageUrl[] = [];
    for (const season of seasons) {
        const pageCount = await fetchPageCount(buildHomeQnaUrl({ program, season }));
        for (let page = 1; page <= pageCount; page++) {
            urls.push(buildQnaUrlWithPage({ program, season, page }));
        }
    }
    return urls;
};

export const fetchQuestionsFromPage = async (url: QnaPageUrl): Promise<[Question[], string[]]> => {
    const urls = extractQuestionUrls({
        url,
        html: await getHtml(url)
    });
    const results = await Promise.allSettled(urls.map(fetchQuestion));
    const passed: Question[] = [],
        failed: string[] = [];
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            passed.push(result.value);
        } else {
            failed.push(urls[i]);
        }
    });
    return [passed, failed];
};

export const fetchQuestionsFromPages = async (urls: QnaPageUrl[], logger?: Logger, interval = 1500): Promise<Question[]> => {
    const questions: Record<string, Question> = {};

    const sleep = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const startTime = process.hrtime.bigint();

    for (const url of urls) {
        attempt({
            attempts: 3,
            async callback() {
                return await fetchQuestionsFromPage(url);
            },
            logger
        });

        await sleep(interval);
    }

    const questionKeys = Object.keys(questions);
    const results = await Promise.allSettled(Object.values(questions));
    const elapsed = new Date(nsToMsElapsed(startTime));
    const success: Question[] = [],
        failed: string[] = [];
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            success.push(result.value);
        } else {
            failed.push(questionKeys[i]);
        }
    });

    logger?.info(`${success.length} succeeded, ${failed.length} failed.`, { failed });
    logger?.info(`Completed in ${elapsed.getMinutes()}min ${elapsed.getSeconds()}s ${elapsed.getMilliseconds()}ms`);
    return success;
};
