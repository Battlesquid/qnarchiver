import fetch from "node-fetch";
import logger from "../util/logger";

const defaultCategories = [
    "VRC",
    "VEXU",
    "VIQC",
    "VAIC",
    "RADC",
    "Judging"
] as const;

type Category = (typeof defaultCategories)[number];

export type SeasonYear = `${number}-${number}`

type CategoryFilters = {
    [k in Category]?: SeasonYear[]
}

type YearFilters = SeasonYear[]
    
export type SeasonFilters = CategoryFilters | YearFilters;

// default season year generation
const baseYear = 2018;
const currentYear = new Date(Date.now()).getFullYear()
const defaultSeasons: SeasonYear[] = [];
for (let year = baseYear; year <= currentYear; year++) {
    defaultSeasons.push(`${year}-${year + 1}`)
}

export { defaultSeasons, defaultCategories };

export const validateSeason = (season: SeasonYear) => {
    const match = season.match(/(?<start>\d{4})-(?<end>\d{4})/)
    if (!match?.groups)
        throw Error(`${season} in unrecognized format`)

    if (parseInt(match.groups.end) - parseInt(match.groups.start) !== 1)
        throw Error(`${season} is an invalid season range. Check that the order of the years is (start-end).`)
}


export const filterSeasons = async (category: string, seasons: SeasonYear[]) => {
    const results = await Promise.all(
        seasons.map(s => pingQA(category, s))
    )
    return seasons.filter((s, i) => results[i])
}

export const pingQA = async (category: string, season: string) => {
    const url = `https://robotevents.com/${category}/${season}/QA`
    const response = await fetch(url);
    logger.verbose(`pingQA: ${url} returned ${response.status}`)
    return response.ok;
}
