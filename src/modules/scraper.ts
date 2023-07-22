import cheerioModule from "cheerio";
import fetch from "node-fetch";
import { DEFAULT_PROGRAMS, DEFAULT_SEASONS, filterInvalidSeasons, SeasonFilters, SeasonYear, validateSeason } from "..";
import attempt from "../util/attempt";
import { select, unleak } from "../util/scraping";

export interface QuestionData {
    /**
     * The question's numerical ID.
     */
    id: string;

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
    asked_timestamp: string;

    /**
     * `asked_timestamp` in milliseconds.
     */
    asked_timestamp_ms: number;

    /**
     * Whether the question was answered.
     */
    answered: boolean;

    /**
     * Tags added to this question.
     */
    tags: string[];
}

const SELECTORS = {
    URL: "div.card-body h4.title > a",
    AUTHOR: "div.author",
    TITLE: "div.question > h4",
    QUESTION: "div.content-body",
    ANSWER: "div.answer.approved .content-body",
    ASKED_TIMESTAMP: "div.timestamp",
    TAGS: "div.tags a",
    PAGE_COUNT: "nav ul.pagination li:nth-last-child(2)"
};

const getPageCount = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw Error(`getPageCount: Fetch for ${url} returned ${response.status}:\n${response.statusText}`);
    }

    const html = unleak((await response.text()));
    const $ = cheerioModule.load(html);

    const el = $(SELECTORS.PAGE_COUNT);
    return Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());
};

/**
 * Fetches data from a single Q&A.
 * @param url The Q&A url to fetch.
 * @returns Relevant data extracted from the Q&A.
 */
export const fetchQuestion = async (url: string): Promise<QuestionData> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(`fetchQuestion: Fetch for ${url} returned ${response.status}:\n${response.statusText}`);
    }

    const html = unleak((await response.text()));
    const $ = cheerioModule.load(html);

    const regex = /^https:\/\/www\.robotevents\.com\/(?<program>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
    const match = url.match(regex);
    if (!match?.groups) {
        throw Error(`${url} in unrecognized format.`);
    }

    const id = match.groups.id;
    const author = select($, SELECTORS.AUTHOR);
    const program = match.groups.program;
    const title = select($, SELECTORS.TITLE);
    const question = select($, SELECTORS.QUESTION);
    const answer = select($, SELECTORS.ANSWER);
    const season = match.groups.season;
    const asked_timestamp = select($, SELECTORS.ASKED_TIMESTAMP);
    const asked_timestamp_ms = new Date(asked_timestamp).getTime();
    const answered = Boolean(answer);
    const tags = $(SELECTORS.TAGS)
        .map((_i, el) => unleak($(el).text().trim())).get();

    return {
        id, url, author, program,
        title, question, answer,
        season, asked_timestamp, asked_timestamp_ms,
        answered, tags
    };
};


export const createQnaUrls = async (filters?: SeasonFilters): Promise<string[]> => {
    const programs: string[] = [];
    const seasons: SeasonYear[][] = [];

    if (filters) {
        if (Array.isArray(filters)) {
            for (const program of DEFAULT_PROGRAMS) {
                const validSeasons = await filterInvalidSeasons(program, filters);
                programs.push(program);
                seasons.push(validSeasons);
            }
        } else {
            if (Object.entries(filters).length) {
                const entries = Object.entries(filters);
                for (const [program, entrySeasons] of entries) {
                    entrySeasons.forEach(validateSeason);
                    const validSeasons = await filterInvalidSeasons(program, entrySeasons);
                    programs.push(program);
                    seasons.push(validSeasons);
                }
            } else {
                for (const program of DEFAULT_PROGRAMS) {
                    const validSeasons = await filterInvalidSeasons(program, DEFAULT_SEASONS);
                    programs.push(program);
                    seasons.push(validSeasons);
                }
            }
        }
    }

    const urls: string[] = [];
    const QA_FIRST_PAGE = 1;

    for (let ci = 0; ci < programs.length; ci++) {
        const program = programs[ci];
        const seasonList = seasons[ci];

        for (const season of seasonList) {
            const pageCount = await getPageCount(`https://robotevents.com/${program}/${season}/QA`);

            for (let i = QA_FIRST_PAGE; i <= pageCount; i++) {
                urls.push(`https://robotevents.com/${program}/${season}/QA?page=${i}`);
            }
        }
    }

    return urls;
};

export const scrapeQA = async (queryUrls: string[], interval = 1500): Promise<QuestionData[] | []> => {
    const questions: Record<string, Promise<QuestionData>> = {};

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const handle = async (url: string) => {

        const response = await fetch(url);

        const html = unleak((await response.text()));
        const $ = cheerioModule.load(html);

        const urls = $(SELECTORS.URL)
            .toArray()
            .map(el => $(el).attr("href"))
            .filter((s): s is string => Boolean(s));

        urls.forEach(url => {
            const regex = /^https:\/\/www\.robotevents\.com\/(?<program>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
            const match = url.match(regex);

            if (!match?.groups) {
                throw Error(`${url} in unrecognized format.`);
            }

            if (!questions[match.groups.id]) {
                questions[match.groups.id] = fetchQuestion(url);
            }
        });
    };

    for (const url of queryUrls) {
        attempt({
            callback: async () => {
                handle(url);
            },
            onRetry: (attempts) => console.warn(`Attempt ${attempts} failed for fetching ${url}, retrying...`),
            onFail: () => console.error(`All attempts to retreive ${url} failed.`),
            logError: true,
            maxAttempts: 3
        });
        await sleep(interval);
    }

    return await Promise.all(Object.values(questions));
};
