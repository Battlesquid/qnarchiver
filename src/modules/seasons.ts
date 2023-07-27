import fetch from "node-fetch";
import { DEFAULT_PROGRAMS, ProgramFilters } from "./programs";

export type SeasonYear = `${number}-${number}`;
type YearFilters = SeasonYear[];
export type SeasonFilters = ProgramFilters | YearFilters;

const CURRENT_YEAR = new Date(Date.now()).getFullYear();
const DEFAULT_SEASONS: SeasonYear[] = [];
for (let year = 2018; year <= CURRENT_YEAR; year++) {
    DEFAULT_SEASONS.push(`${year}-${year + 1}`);
}

export const fetchAllSeasons = async () => {
    const allSeasons: SeasonYear[] = [];
    const [start] = (await getCurrentSeason()).split("-");
    for (let year = 2018; year <= parseInt(start); year++) {
        allSeasons.push(`${year}-${year + 1}`);
    }
    return allSeasons;
};

export { DEFAULT_SEASONS, DEFAULT_PROGRAMS };

export const validateSeasonsExist = async (program: string, seasons: SeasonYear[]) => {
    return Promise.all(
        seasons.map(async season => {
            const match = season.match(/(?<start>\d{4})-(?<end>\d{4})/);
            if (!match?.groups) {
                throw Error(`${season} does not match the format '{year}-{year}'.`);
            }

            if (parseInt(match.groups.end) - parseInt(match.groups.start) !== 1) {
                throw Error(`${season} does not match the format '{year}-{year + 1}'`);
            }
            return pingQA(program, season);
        })
    );
};

/**
 * Checks whether a Q&A forum exists.
 * @param program The program to check
 * @param season The season to check
 * @returns Boolean indicating whether the Q&A forum exists
 */
export const pingQA = async (program: string, season: string) => {
    const url = `https://robotevents.com/${program}/${season}/QA`;
    const response = await fetch(url);
    return response.ok;
};

/**
 * Gets the current season
 * @returns The current season
 */
export const getCurrentSeason = async (): Promise<SeasonYear> => {
    const year = new Date().getFullYear();
    const newSeason = await pingQA("VRC", `${year}-${year + 1}`);
    return newSeason ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};
