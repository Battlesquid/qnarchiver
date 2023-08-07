import { Logger } from "pino";
import { Program, Season } from "../types";
import { DEFAULT_PROGRAMS } from "./constants";
import { fetchPagesForSeasons, pingQna } from "./fetchers";
import { QnaPageUrl } from "./parsing";

const unique = <T>(arr: T[]): T[] => arr.filter((a, i) => arr.indexOf(a) === i);

export type YearFilters = Season[];
export type ProgramFilters = {
    [k in Program]?: Season[];
};
export type QnaFilters = ProgramFilters | YearFilters;

const verifyQnaExists = async (program: string, season: Season): Promise<void> => {
    const match = season.match(/(?<start>\d{4})-(?<end>\d{4})/);
    if (!match?.groups) {
        throw Error(`${season} does not match the format '{year}-{year}'.`);
    }

    if (parseInt(match.groups.end) - parseInt(match.groups.start) !== 1) {
        throw Error(`${season} does not match the format '{year}-{year + 1}'`);
    }

    const exists = pingQna(program, season);
    if (!exists) {
        throw Error(`Unable to find a ${program} Q&A for the ${season} season`);
    }
};

const verifyQnasExist = async (program: string, seasons: Season[]): Promise<void> => {
    await Promise.all(seasons.map((s) => verifyQnaExists(program, s)));
};

const processFilters = async (filters?: QnaFilters, logger?: Pick<Logger, "trace">): Promise<[string[], Season[][]]> => {
    const programs: string[] = [];
    const seasons: Season[][] = [];

    if (!filters) {
        logger?.trace("No filters provided.");
        return [[], []];
    }

    if (Array.isArray(filters)) {
        const uniqueSeasons = unique(filters);
        for (const program of DEFAULT_PROGRAMS) {
            await verifyQnasExist(program, uniqueSeasons);
            if (program === "Judging") {
                programs.push(program);
                seasons.push([uniqueSeasons[0]]);
            } else {
                programs.push(program);
                seasons.push(uniqueSeasons);
            }
        }
        return [programs, seasons];
    }

    const entries = Object.entries(filters);
    for (const [program, entrySeasons] of entries) {
        const uniqueSeasons = unique(entrySeasons);
        await verifyQnasExist(program, uniqueSeasons);
        if (program === "Judging") {
            programs.push(program);
            seasons.push([uniqueSeasons[0]]);
        } else {
            programs.push(program);
            seasons.push(uniqueSeasons);
        }
    }

    return [programs, seasons];
};

export const getScrapingUrls = async (filters?: QnaFilters, logger?: Logger): Promise<QnaPageUrl[]> => {
    const [programs, seasons] = await processFilters(filters, logger);
    const urls: QnaPageUrl[] = [];
    for (let ci = 0; ci < programs.length; ci++) {
        const program = programs[ci];
        const seasonList = seasons[ci];
        const pages = await fetchPagesForSeasons(program, seasonList, logger);
        urls.push(...pages);
    }
    logger?.trace({ urls }, `Created ${urls.length} urls that satisfy the provided filters.`);
    return urls;
};
