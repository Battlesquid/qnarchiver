import cheerioModule from "cheerio"
import fetch from "node-fetch"
import {
    defaultCategories,
    defaultSeasons,
    filterSeasons,
    SeasonFilters,
    SeasonYear,
    validateSeason
} from ".."
import logger from "../util/logger"
import attempt from "../util/attempt"
import { unformat, unleak } from "../util/stringutil"

export interface QuestionData {
    id: string
    url: string
    author: string
    category: string
    title: string
    question: string
    answer: string
    season: string
    timestamp: string
    timestamp_ms: number
    answered: boolean
    tags: string[]
}

const getPageCount = async (url: string, silent = true) => {
    logger.transports.forEach(t => t.silent = silent);

    logger.verbose(`getPageCount: Getting page count for ${url}`)
    const response = await fetch(url);

    if (!response.ok)
        throw Error(`getPageCount: Fetch for ${url} returned ${response.status}:\n${response.statusText}`)

    logger.verbose(`getPageCount: OK response from ${url}`)

    const html = unleak((await response.text()))
    const $ = cheerioModule.load(html);

    const el = $('nav ul.pagination li:nth-last-child(2)');
    const pageCount = Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());

    logger.verbose(`getPageCount: Page count for ${url}: ${pageCount}`);

    return pageCount;
}

export const fetchQuestion = async (url: string, silent = true): Promise<QuestionData> => {
    logger.transports.forEach(t => t.silent = silent);

    logger.verbose(`fetchQuestion: Fetching ${url}`)

    const response = await fetch(url);
    if (!response.ok)
        throw Error(`fetchQuestion: Fetch for ${url} returned ${response.status}:\n${response.statusText}`)

    const html = unleak((await response.text()));
    const $ = cheerioModule.load(html);

    const regex = /^https:\/\/www\.robotevents\.com\/(?<category>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
    const match = url.match(regex);
    if (!match?.groups)
        throw Error(`${url} in unrecognized format`)

    const id = match.groups.id
    const author = unleak(unformat($('div.author').text()))
    const category = match.groups.category
    const title = unleak(unformat($('div.question > h4').text()))
    const question = unleak(unformat($('div.content-body').text()))
    const answer = unleak(unformat($('div.answer.approved .content-body').text()))
    const season = match.groups.season
    const timestamp = unleak(unformat($('div.timestamp').text()))
    const timestamp_ms = new Date(timestamp).getTime();
    const answered = Boolean(answer)
    const tags = $('div.tags a')
        .map((i, el) => unleak($(el).text().trim())).get()

    return {
        id, url, author, category,
        title, question, answer,
        season, timestamp, timestamp_ms,
        answered, tags
    }
}

export const createQnaUrls = async (filters?: SeasonFilters, silent = true): Promise<string[]> => {
    logger.transports.forEach(t => t.silent = silent);

    const categories: string[] = [];
    const seasons: SeasonYear[][] = [];

    if (filters) {
        if (Array.isArray(filters)) {
            for (const category of defaultCategories) {
                const validSeasons = await filterSeasons(category, filters);
                categories.push(category)
                seasons.push(validSeasons);
            }
        } else {
            if (Object.entries(filters).length) {
                const entries = Object.entries(filters);
                for (const [category, entrySeasons] of entries) {
                    entrySeasons.forEach(validateSeason);
                    const validSeasons = await filterSeasons(category, entrySeasons);
                    categories.push(category)
                    seasons.push(validSeasons);
                }
            } else {
                for (const category of defaultCategories) {
                    const validSeasons = await filterSeasons(category, defaultSeasons);
                    categories.push(category)
                    seasons.push(validSeasons);
                }
            }
        }
    }

    logger.verbose(`createQnaUrls: Using the categories ${categories.join(", ")}`)
    logger.verbose(`createQnaUrls: Using the seasons ${seasons.map(s => `[${s.join(", ")}]`).join(", ")}`)

    const urls: string[] = [];
    const QA_FIRST_PAGE = 1;

    // maybe theres a better way to do this
    for (let ci = 0; ci < categories.length; ci++) {
        const category = categories[ci];
        const seasonList = seasons[ci];

        for (const season of seasonList) {
            const pageCount = await getPageCount(`https://robotevents.com/${category}/${season}/QA`)

            for (let i = QA_FIRST_PAGE; i <= pageCount; i++) {
                urls.push(`https://robotevents.com/${category}/${season}/QA?page=${i}`)
            }
        }
    }

    logger.verbose(`createQnaUrls: Resolved ${urls.length} urls`)
    return urls;
}

export const scrapeQA = async (queryUrls: string[], silent = true, interval = 1500): Promise<QuestionData[] | []> => {
    logger.transports.forEach(t => t.silent = silent);

    const questions: { [k: string]: Promise<QuestionData> } = {};

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handle = async (url: string, silent = true) => {
        logger.transports.forEach(t => t.silent = silent);

        logger.verbose(`scrapeQA: Getting questions from ${url}`);

        const response = await fetch(url);

        const html = unleak((await response.text()));
        const $ = cheerioModule.load(html);

        const urls = $('div.card-body h4.title > a')
            .toArray()
            .map(el => $(el).attr('href'))
            .filter((s): s is string => Boolean(s));

        urls.forEach(url => {
            const regex = /^https:\/\/www\.robotevents\.com\/(?<category>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
            const match = url.match(regex);

            if (!match?.groups)
                throw Error(`${url} in unrecognized format`);

            if (!questions[match.groups.id])
                questions[match.groups.id] = fetchQuestion(url, silent);
        })
    }

    for (const url of queryUrls) {
        attempt({
            callback: async () => {
                handle(url, silent);
            },
            onRetry: (attempts: number) => logger.warn(`Attempt ${attempts} failed for fetching ${url}, retrying...`),
            onFail: () => logger.error(`All attempts to retreive ${url} failed.`),
            logError: true,
            maxAttempts: 3
        });
        await sleep(interval);
    }

    return await Promise.all(Object.values(questions));
}
