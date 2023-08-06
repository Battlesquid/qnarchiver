import { Season } from "../types";

export const CURRENT_YEAR = new Date(Date.now()).getFullYear();

export const DEFAULT_SEASONS: Season[] = [];
for (let year = 2018; year <= CURRENT_YEAR; year++) {
    DEFAULT_SEASONS.push(`${year}-${year + 1}`);
}

export const DEFAULT_PROGRAMS = ["VRC", "VEXU", "VIQRC", "Judging"] as const;
