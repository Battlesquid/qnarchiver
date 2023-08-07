import { Season } from "../types";

export const CURRENT_YEAR = new Date(Date.now()).getFullYear();

export const START_YEAR = 2018;

export const DEFAULT_SEASONS: Season[] = Array(CURRENT_YEAR - START_YEAR + 1)
    .fill(0)
    .map<Season>((_, i) => `${START_YEAR + i}-${START_YEAR + i + 1}`);

export const DEFAULT_PROGRAMS = ["VRC", "VEXU", "VIQRC", "Judging"] as const;
