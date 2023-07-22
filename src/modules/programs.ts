import { SeasonYear } from "./seasons";

export const DEFAULT_PROGRAMS = [
    "VRC",
    "VEXU",
    "VIQRC",
    "VAIC",
    "Judging"
] as const;

export type Program = (typeof DEFAULT_PROGRAMS)[number];

export type ProgramFilters = {
    [k in Program]?: SeasonYear[];
}
