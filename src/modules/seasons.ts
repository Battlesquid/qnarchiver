import fetch from "node-fetch";

const defaultPrograms = [
    "VRC",
    "VEXU",
    "VIQC",
    "VAIC",
    "RADC",
    "Judging"
] as const;

type Program = (typeof defaultPrograms)[number];

export type SeasonYear = `${number}-${number}`

type ProgramFilters = {
    [k in Program]?: SeasonYear[]
}

type YearFilters = SeasonYear[]

export type SeasonFilters = ProgramFilters | YearFilters;

// default season year generation
const baseYear = 2018;
const currentYear = new Date(Date.now()).getFullYear()
const defaultSeasons: SeasonYear[] = [];
for (let year = baseYear; year <= currentYear; year++) {
    defaultSeasons.push(`${year}-${year + 1}`)
}

export const getAllSeasons = async () => {
    const [start] = (await getActiveSeason()).split("-");
    const seasons: SeasonYear[] = [];
    const baseYear = 2018;
    for (let year = baseYear; year <= parseInt(start); year++) {
        seasons.push(`${year}-${year + 1}`)
    }
    return seasons;
}

export { defaultSeasons, defaultPrograms };

export const validateSeason = (season: SeasonYear) => {
    const match = season.match(/(?<start>\d{4})-(?<end>\d{4})/)
    if (!match?.groups)
        throw Error(`${season} in unrecognized format`)

    if (parseInt(match.groups.end) - parseInt(match.groups.start) !== 1)
        throw Error(`${season} is an invalid season range. Check that the order of the years is (start-end).`)
}

export const filterSeasons = async (program: string, seasons: SeasonYear[]) => {
    const results = await Promise.all(
        seasons.map(s => pingQA(program, s))
    )
    return seasons.filter((s, i) => results[i])
}

export const pingQA = async (program: string, season: string, silent = true) => {
    const url = `https://robotevents.com/${program}/${season}/QA`
    const response = await fetch(url);
    return response.ok;
}

export const getActiveSeason = async (): Promise<SeasonYear> => {
    const year = new Date().getFullYear();
    const newSeason = await pingQA("VRC", `${year}-${year + 1}`);
    return newSeason
        ? `${year}-${year + 1}`
        : `${year - 1}-${year}`;
}
