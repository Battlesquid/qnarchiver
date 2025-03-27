import type { Question, Season } from "../types";

export interface IConstants {
	DEFAULT_SEASONS: Season[];
	START_YEAR: number;
	CURRENT_YEAR: number;
	QUESTION_PROPERTIES: readonly (keyof Question)[];
	DEFAULT_PROGRAMS: ["V5RC", "VURC", "VIQRC", "Judging"];
}

export const Constants: IConstants = {
	START_YEAR: 2018,
	CURRENT_YEAR: new Date(Date.now()).getFullYear(),
	get DEFAULT_SEASONS() {
		return Array(this.CURRENT_YEAR - this.START_YEAR + 1)
			.fill(0)
			.map<Season>(
				(_, i) => `${this.START_YEAR + i}-${this.START_YEAR + i + 1}`,
			);
	},
	get QUESTION_PROPERTIES() {
		return [
			"id",
			"url",
			"author",
			"program",
			"title",
			"question",
			"questionRaw",
			"answer",
			"answerRaw",
			"season",
			"askedTimestamp",
			"askedTimestampMs",
			"answeredTimestamp",
			"answeredTimestampMs",
			"answered",
			"tags",
		] satisfies readonly (keyof Question)[];
	},
	DEFAULT_PROGRAMS: ["V5RC", "VURC", "VIQRC", "Judging"],
};
