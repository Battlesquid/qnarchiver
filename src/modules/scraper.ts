import cheerioModule from "cheerio";
import fetch from "node-fetch";
import { DEFAULT_PROGRAMS, DEFAULT_SEASONS, getCurrentSeason, SeasonFilters, SeasonYear, validateSeasonsExist } from "..";
import attempt from "../util/attempt";

export interface Question {
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
    PAGE_COUNT: "nav ul.pagination li:nth-last-child(2)",
    ATTACHMENTS: ".image-gallery"
} as const;

// https://bugs.chromium.org/p/v8/issues/detail?id=2869
const unleak = (str: string | undefined): string => (" " + str).slice(1);

const unique = <T>(arr: T[]) => arr.filter((a, i) => arr.indexOf(a) === i);

const unformat = (str: string) => str
    .split(/\n/g) //split on newline
    .map(n => n.trim()) //remove whitespace
    .filter(Boolean) //remove the empty elements
    .join("");

const loadHTML = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw Error(`Fetch ${url} returned ${response.status}: ${response.statusText}`);
    }
    const html = unleak((await response.text()));
    return cheerioModule.load(html);
};

const select = ($: cheerio.Root, selector: string | cheerio.Element) => {
    return unleak(unformat($(selector).text()));
};

const parseQnaURL = (url: string) => {
    const regex = /^https:\/\/www\.robotevents\.com\/(?<program>\w+)\/(?<season>\d{4}-\d{4})\/QA\/(?<id>\d+)$/;
    const match = url.match(regex);
    if (!match?.groups) {
        throw Error(`${url} in unrecognized format.`);
    }
    return {
        id: match.groups.id,
        program: match.groups.program,
        season: match.groups.season
    };
};

type QnaUrlParams = {
    program: string;
    season: string;
    id?: number;
    page?: number;
}

const buildQnaURL = (params: QnaUrlParams) => {
    const { program, season } = params;
    let url = `https://robotevents.com/${program}/${season}/QA`;
    url += params.id ? `/${params.id}` : "";
    url += params.page ? `?page=${params.page}` : "";
    return url;
};

const getPageCount = async (url: string) => {
    const $ = await loadHTML(url);
    const el = $(SELECTORS.PAGE_COUNT);
    return Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());
};

/**
 * Fetches data from a single Q&A.
 * @param url The Q&A url to fetch.
 * @returns Relevant data extracted from the Q&A.
 */
export const fetchQuestion = async (url: string): Promise<Question> => {
    const $ = await loadHTML(url);

    const { id, program, season } = parseQnaURL(url);
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


export const getScrapingUrls = async (filters?: SeasonFilters): Promise<string[]> => {
    const programs: string[] = [];
    const seasons: SeasonYear[][] = [];

    if (filters) {
        if (Array.isArray(filters)) {
            const uniqueSeasons = unique(filters);
            for (const program of DEFAULT_PROGRAMS) {
                await validateSeasonsExist(program, uniqueSeasons);
                programs.push(program);
                seasons.push(uniqueSeasons);
            }
        } else {
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
        }
    } else {
        const currentSeason = await getCurrentSeason();
        programs.push(...DEFAULT_PROGRAMS);
        seasons.push(...new Array(DEFAULT_PROGRAMS.length).fill([currentSeason]));
    }

    const urls: string[] = [];
    const QA_FIRST_PAGE = 1;

    for (let ci = 0; ci < programs.length; ci++) {
        const program = programs[ci];
        const seasonList = seasons[ci];

        for (const season of seasonList) {
            const pageCount = await getPageCount(buildQnaURL({ program, season }));

            for (let i = QA_FIRST_PAGE; i <= pageCount; i++) {
                urls.push(buildQnaURL({ program, season, page: i }));
            }
        }
    }

    return urls;
};

/**
 * Scrapes the provided Q&As
 * @param targets A list of Q&A urls to scrape
 * @param interval The rate at which Q&As are scraped, in milliseconds
 * @returns A list of {@link Question}s containing the data of the scraped Q&As
 */
export const scrapeQna = async (targets: string[], interval = 1500): Promise<Question[] | []> => {
    const questions: Record<string, Promise<Question>> = {};

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const handle = async (url: string) => {
        const $ = await loadHTML(url);
        const urls = $(SELECTORS.URLS)
            .toArray()
            .map(el => $(el).attr("href"))
            .filter((s): s is string => Boolean(s));

        urls.forEach(url => {
            const { id } = parseQnaURL(url);
            if (!questions[id]) {
                questions[id] = fetchQuestion(url);
            }
        });
    };

    for (const url of targets) {
        attempt({
            callback: async () => handle(url),
            onFail: (e) => { throw Error(`Failed to handle ${url}: ${e}`); },
            logError: true,
            attempts: 3
        });
        await sleep(interval);
    }

    return await Promise.all(Object.values(questions));
};
