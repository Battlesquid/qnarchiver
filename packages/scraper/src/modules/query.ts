import type { Question, Season } from "../types";
import {
	type FetcherOptions,
	type IterativeFetchOptions,
	type IterativeFetchResult,
	fetchCurrentSeason,
	fetchQuestionsFromPages,
	fetchQuestionsIterative,
} from "./fetchers";
import { type QnaFilters, getScrapingUrls } from "./generators";

/**
 * Utility wrapper around {@link getQuestions} that gets unanswered questions for the current season.
 * @param logger Optional {@link Logger}
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async (
	options?: FetcherOptions,
): Promise<Question[]> => {
	const questions = await getQuestions(undefined, options);
	return questions.filter((q) => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @param logger Optional {@link Logger}
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (
	filters?: QnaFilters,
	options?: FetcherOptions,
): Promise<Question[]> => {
	const finalFilters = filters ?? [await fetchCurrentSeason(options)];
	const urls = await getScrapingUrls(finalFilters, options);
	return fetchQuestionsFromPages(urls, options);
};

/**
 * Gets all questions. Includes questions that may not be shown on the Q&A homepage.
 * @param logger Optional {@link Logger}
 * @returns All questions from every season
 */
export const getAllQuestions = async (
	options?: IterativeFetchOptions,
): Promise<IterativeFetchResult> => {
	return await fetchQuestionsIterative(options);
};

/**
 * Gets the oldest unanswered question for a given season.
 * @param questions The questions to operate on
 * @param season The season in which to search in
 * @returns The oldest question asked for the given season, if any
 */
export const getOldestUnansweredQuestion = (
	questions: Question[],
	season: Season,
): Question | undefined => {
	const data = [...questions];
	data.sort(
		(q1, q2) =>
			q1.askedTimestampMs -
			q2.askedTimestampMs +
			(Number.parseInt(q1.id) - Number.parseInt(q2.id)),
	);
	return data.find(
		(q) =>
			q.answered === false &&
			q.season === season &&
			!q.title.startsWith("[archived]"),
	);
};

/**
 * Gets the oldest unanswered question for a given season.
 * @param questions The questions to operate on
 * @param season The season in which to search in
 * @returns The oldest question asked for the given season, if any
 */
export const getOldestQuestion = (
	questions: Question[],
	season: Season,
): Question | undefined => {
	const data = [...questions];
	data.sort(
		(q1, q2) =>
			q1.askedTimestampMs -
			q2.askedTimestampMs +
			(Number.parseInt(q1.id) - Number.parseInt(q2.id)),
	);
	return data.find(
		(q) => q.season === season && !q.title.startsWith("[archived]"),
	);
};
