import fetch from "node-fetch";
import { buildHomeQnaUrl } from "./parsing";

const CURRENT_YEAR = new Date(Date.now()).getFullYear();
export const DEFAULT_SEASONS: Season[] = [];
for (let year = 2018; year <= CURRENT_YEAR; year++) {
    DEFAULT_SEASONS.push(`${year}-${year + 1}`);
}

export const DEFAULT_PROGRAMS = [
    "VRC",
    "VEXU",
    "VIQRC",
    "Judging"
] as const;

export type Season = `${number}-${number}`;
export type Program = (typeof DEFAULT_PROGRAMS)[number];

export type YearFilters = Season[];
export type ProgramFilters = {
    [k in Program]?: Season[];
}
export type SeasonFilters = ProgramFilters | YearFilters;

/**
 * Fetches all seasons. More accurate than {@link DEFAULT_SEASONS} because it
 * handles the layover between a recently finished season and a new season.
 * @returns All seasons up to the present date
 */
export const fetchAllSeasons = async (): Promise<Season[]> => {
    const allSeasons: Season[] = [];
    const [start] = (await getCurrentSeason()).split("-");
    for (let year = 2018; year <= parseInt(start); year++) {
        allSeasons.push(`${year}-${year + 1}`);
    }
    return allSeasons;
};

/**
 * Validates that Q&A pages exist for the given program and seasons. Throws an error when invalid
 * formatting is found or the Q&A page doesn't exist.
 * @param program The program to check
 * @param seasons A list of seasons to check
 */
export const validateSeasonsExist = async (program: string, seasons: Season[]): Promise<void> => {
    const validate = async (season: Season): Promise<void> => {
        const match = season.match(/(?<start>\d{4})-(?<end>\d{4})/);
        if (!match?.groups) {
            throw Error(`${season} does not match the format '{year}-{year}'.`);
        }

        if (parseInt(match.groups.end) - parseInt(match.groups.start) !== 1) {
            throw Error(`${season} does not match the format '{year}-{year + 1}'`);
        }

        const exists = pingQA(program, season);
        if (!exists) {
            throw Error(`Unable to find a ${program} Q&A for the ${season} season`);
        }
    };
    await Promise.all(seasons.map(validate));
};

/**
 * Checks whether a Q&A forum exists.
 * @param program The program to check
 * @param season The season to check
 * @returns Boolean indicating whether the Q&A forum exists
 */
export const pingQA = async (program: string, season: string): Promise<boolean> => {
    const url = buildHomeQnaUrl({ program, season });
    const response = await fetch(url);
    return response.ok;
};

/**
 * Gets the current season
 * @returns The current season
 */
export const getCurrentSeason = async (): Promise<Season> => {
    const year = new Date().getFullYear();
    const newSeason = await pingQA("VRC", `${year}-${year + 1}`);
    return newSeason ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};
