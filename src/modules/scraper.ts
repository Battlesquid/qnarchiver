import cheerioModule from "cheerio"
import fetch from "node-fetch"
import {defaultPrograms, defaultSeasons, filterSeasons, SeasonFilters, SeasonYear, validateSeason} from ".."
import attempt from "../util/attempt"
import {unformat, unleak} from "../util/stringutil"

export interface QuestionData {
    id: string
    url: string
    author: string
    program: string
    title: string
    question: string
    answer: string
    season: string
    timestamp: string
    timestamp_ms: number
    answered: boolean
    tags: string[]
}

const getPageCount = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok)
        throw Error(`getPageCount: Fetch for ${url} returned ${response.status}:\n${response.statusText}`)

    const html = unleak((await response.text()))
    const $ = cheerioModule.load(html);

    const el = $('nav ul.pagination li:nth-last-child(2)');
    return Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());
}

export const fetchQuestion = async (url: string): Promise<QuestionData> => {
    const response = await fetch(url);
    if (!response.ok)
        throw Error(`fetchQuestion: Fetch for ${url} returned ${response.status}:\n${response.statusText}`)

    const html = unleak((await response.text()));
    const $ = cheerioModule.load(html);

    const regex = /^https:\/\/www\.robotevents\.com\/(?<program>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
    const match = url.match(regex);
    if (!match?.groups)
        throw Error(`${url} in unrecognized format`)

    const id = match.groups.id
    const author = unleak(unformat($('div.author').text()))
    const program = match.groups.program
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
        id, url, author, program,
        title, question, answer,
        season, timestamp, timestamp_ms,
        answered, tags
    }
}

export const createQnaUrls = async (filters?: SeasonFilters): Promise<string[]> => {
    const programs: string[] = [];
    const seasons: SeasonYear[][] = [];

    if (filters) {
        if (Array.isArray(filters)) {
            for (const program of defaultPrograms) {
                const validSeasons = await filterSeasons(program, filters);
                programs.push(program)
                seasons.push(validSeasons);
            }
        } else {
            if (Object.entries(filters).length) {
                const entries = Object.entries(filters);
                for (const [program, entrySeasons] of entries) {
                    entrySeasons.forEach(validateSeason);
                    const validSeasons = await filterSeasons(program, entrySeasons);
                    programs.push(program)
                    seasons.push(validSeasons);
                }
            } else {
                for (const program of defaultPrograms) {
                    const validSeasons = await filterSeasons(program, defaultSeasons);
                    programs.push(program)
                    seasons.push(validSeasons);
                }
            }
        }
    }

    const urls: string[] = [];
    const QA_FIRST_PAGE = 1;

    // maybe theres a better way to do this
    for (let ci = 0; ci < programs.length; ci++) {
        const program = programs[ci];
        const seasonList = seasons[ci];

        for (const season of seasonList) {
            const pageCount = await getPageCount(`https://robotevents.com/${program}/${season}/QA`)

            for (let i = QA_FIRST_PAGE; i <= pageCount; i++) {
                urls.push(`https://robotevents.com/${program}/${season}/QA?page=${i}`)
            }
        }
    }

    return urls;
}

export const scrapeQA = async (queryUrls: string[], interval = 1500): Promise<QuestionData[] | []> => {

    const questions: { [k: string]: Promise<QuestionData> } = {};

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handle = async (url: string) => {

        const response = await fetch(url);

        const html = unleak((await response.text()));
        const $ = cheerioModule.load(html);

        const urls = $('div.card-body h4.title > a')
            .toArray()
            .map(el => $(el).attr('href'))
            .filter((s): s is string => Boolean(s));

        urls.forEach(url => {
            const regex = /^https:\/\/www\.robotevents\.com\/(?<program>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
            const match = url.match(regex);

            if (!match?.groups)
                throw Error(`${url} in unrecognized format`);

            if (!questions[match.groups.id])
                questions[match.groups.id] = fetchQuestion(url);
        })
    }

    for (const url of queryUrls) {
        attempt({
            callback: async () => {
                handle(url);
            },
            onRetry: (attempts: number) => console.warn(`Attempt ${attempts} failed for fetching ${url}, retrying...`),
            onFail: () => console.error(`All attempts to retreive ${url} failed.`),
            logError: true,
            maxAttempts: 3
        });
        await sleep(interval);
    }

    return await Promise.all(Object.values(questions));
}
