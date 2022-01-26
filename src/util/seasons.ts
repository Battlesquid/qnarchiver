import { Category } from "..";

export enum SeasonYears {
    SEASON_2018_2019 = "2018-2019",
    SEASON_2019_2020 = "2019-2020",
    SEASON_2020_2021 = "2020-2021",
    SEASON_2021_2022 = "2021-2022"
}

// weird edge case
const SEASON_JUDGING = SeasonYears.SEASON_2021_2022

export const ALL_SEASONS = Object.values(SeasonYears)

export const SeasonDefaults = {
    [Category.VRC]: ALL_SEASONS,
    [Category.VEXU]: ALL_SEASONS,
    [Category.VIQC]: ALL_SEASONS.filter(s => s !== SeasonYears.SEASON_2020_2021) /* as Exclude<SeasonYears, SeasonYears.SEASON_2020_2021>[] */,
    [Category.VAIC]: [SeasonYears.SEASON_2021_2022],
    [Category.RADC]: ALL_SEASONS.filter(s => s !== SeasonYears.SEASON_2018_2019),
    [Category.Judging]: [SEASON_JUDGING]
}

export type SeasonFilters = Partial<{
    [Category.VRC]: SeasonYears[],
    [Category.VEXU]: SeasonYears[],
    [Category.VIQC]: Exclude<SeasonYears, SeasonYears.SEASON_2020_2021>[],
    [Category.VAIC]: [SeasonYears.SEASON_2021_2022],
    [Category.RADC]: Exclude<SeasonYears, SeasonYears.SEASON_2018_2019>[],
    [Category.Judging]: [typeof SEASON_JUDGING]
}>