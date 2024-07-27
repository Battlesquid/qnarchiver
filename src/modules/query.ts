import { Logger } from "pino";
import { Question, Season } from "../types";
import { fetchCurrentSeason, fetchQuestionsFromPages, fetchQuestionsIterative, IterativeFetchResult } from "./fetchers";
import { QnaFilters, getScrapingUrls } from "./generators";

/**
 * Utility wrapper around {@link getQuestions} that gets unanswered questions for the current season.
 * @param logger Optional {@link Logger}
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async (logger?: Logger): Promise<Question[]> => {
    const questions = await getQuestions(undefined, logger);
    return questions.filter((q) => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @param logger Optional {@link Logger}
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (filters?: QnaFilters, logger?: Logger): Promise<Question[]> => {
    if (filters === undefined) {
        filters = [await fetchCurrentSeason(logger)];
    }
    const urls = await getScrapingUrls(filters, logger);
    return fetchQuestionsFromPages(urls, logger);
};

/**
 * Gets all questions.
 * @param logger Optional {@link Logger}
 * @returns All questions from every season
 */
export const getAllQuestions = async (logger?: Logger): Promise<IterativeFetchResult> => {
    return await fetchQuestionsIterative({ logger });
};

/**
 * Gets questions from a specified start point. For the purpose of getting updated
 * Q&A data, this is more performant, compared to fetching all questions from a season.
 * @param start The ID to start fetching questions from
 * @param logger Optional {@link Logger}
 * @returns All questions from the specified start point, plus some additional utility data.
 */
export const getQuestionsFromStart = async (start: number, logger?: Logger): Promise<IterativeFetchResult> => {
    return await fetchQuestionsIterative({ start, logger });
};

/**
 * Gets the oldest unanswered question for a given season.
 * @param questions The questions to operate on
 * @param season The season in which to search in
 * @returns The oldest question asked for the given season, if any
 */
export const getOldestUnansweredQuestion = (questions: Question[], season: Season): Question | undefined => {
    const data = [...questions];
    data.sort((q1, q2) => (q1.askedTimestampMs ?? 0) - (q2.askedTimestampMs ?? 0));
    return data.find((q) => q.answered === false && q.season === season && !q.title.startsWith("[archived]"));
};

/**
 * Gets the oldest unanswered question for a given season.
 * @param questions The questions to operate on
 * @param season The season in which to search in
 * @returns The oldest question asked for the given season, if any
 */
export const getOldestQuestion = (questions: Question[], season: Season): Question | undefined => {
    const data = [...questions];
    data.sort((q1, q2) => (q1.askedTimestampMs ?? 0) - (q2.askedTimestampMs ?? 0));
    return data.find((q) => q.season === season && !q.title.startsWith("[archived]"));
};
