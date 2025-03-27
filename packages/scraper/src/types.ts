import type { Constants } from "./modules/constants";

export interface Question {
	/**
	 * The question's numerical ID.
	 */
	id: string;

	/**
	 * The url of the question.
	 */
	url: string;

	/**
	 * The person who asked the question.
	 */
	author: string;

	/**
	 * The program this question was asked in (e.g., V5RC, VURC, etc).
	 */
	program: string;

	/**
	 * The title of the question.
	 */
	title: string;

	/**
	 * The question content.
	 */
	question: string;

	/**
	 * The question content as raw html
	 */
	questionRaw: string;

	/**
	 * The answer to the question.
	 */
	answer: string | null;

	/**
	 * The answer content as raw html
	 */
	answerRaw: string | null;

	/**
	 * The season this question was asked in (e.g., 2022-2023).
	 */
	season: string;

	/**
	 * When this question was asked (in the format DD-Mon-YYYY).
	 */
	askedTimestamp: string;

	/**
	 * {@link askedTimestamp} in milliseconds.
	 */
	askedTimestampMs: number;

	/**
	 * When this question was answered (in the format DD-Mon-YYYY).
	 */
	answeredTimestamp: string | null;

	/**
	 * {@link answeredTimestamp} in milliseconds.
	 */
	answeredTimestampMs: number | null;

	/**
	 * Whether the question was answered.
	 */
	answered: boolean;

	/**
	 * Tags added to this question.
	 */
	tags: string[];
}

export type Season = `${number}-${number}`;

export type Program = (typeof Constants.DEFAULT_PROGRAMS)[number];
