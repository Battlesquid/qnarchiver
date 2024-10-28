import { Logger } from "pino";
import { Program, Season } from "../types";
import { Constants } from "./constants";
import { fetchPagesForSeasons, pingQna } from "./fetchers";
import { QnaPageUrl } from "./parsing";

const unique = <T>(arr: T[]): T[] => arr.filter((a, i) => arr.indexOf(a) === i);

export type YearFilters = Season[];
export type ProgramFilters = {
    [k in Program]?: Season[];
};
export type QnaFilters = ProgramFilters | YearFilters;

export interface GeneratorOptions {
    logger?: Logger;
}

/**
 * Verifies that a Q&A exists, actually validating that the program and season is valid before calling {@link pingQna}
 * @param program The program of the Q&A to check
 * @param season The season of the Q&A to check
 */
export const verifyQnaExists = async (program: string, season: Season): Promise<void> => {
    const match = season.match(/(?<start>\d{4})-(?<end>\d{4})/);
    if (!match?.groups) {
        throw Error(`${season} does not match the format '{year}-{year}'.`);
    }

    if (parseInt(match.groups.end) - parseInt(match.groups.start) !== 1) {
        throw Error(`${season} does not match the format '{year}-{year + 1}'`);
    }

    const exists = await pingQna(program, season);
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
        for (const program of Constants.DEFAULT_PROGRAMS) {
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

/**
 * Generate a list of urls to scrape based on the given filters
 * @param filters The filters to apply
 * @returns A list of urls to scrape that match the given filters
 */
export const getScrapingUrls = async (filters?: QnaFilters, options?: GeneratorOptions): Promise<QnaPageUrl[]> => {
    const [programs, seasons] = await processFilters(filters, options?.logger);
    const urls: QnaPageUrl[] = [];
    for (let ci = 0; ci < programs.length; ci++) {
        const program = programs[ci];
        const seasonList = seasons[ci];
        const pages = await fetchPagesForSeasons(program, seasonList, options);
        urls.push(...pages);
    }
    options?.logger?.trace({ urls }, `Created ${urls.length} urls that satisfy the provided filters.`);
    return urls;
};
