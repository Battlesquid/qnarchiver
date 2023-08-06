import { Logger } from "pino";
import { Question } from "../types";
import { DEFAULT_SEASONS } from "./constants";
import { fetchCurrentSeason, fetchQuestionsFromPages } from "./fetchers";
import { QnaFilters, getScrapingUrls } from "./generators";

/**
 * Utility wrapper around {@link getQuestions} that gets unanswered questions for the current season.
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async (logger?: Logger): Promise<Question[]> => {
    const questions = await getQuestions(undefined, logger);
    return questions.filter((q) => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (filters?: QnaFilters, logger?: Logger): Promise<Question[]> => {
    if (filters === undefined) {
        filters = [await fetchCurrentSeason()];
    }
    const queryUrls = await getScrapingUrls(filters, logger);
    return fetchQuestionsFromPages(queryUrls, logger);
};

/**
 * Gets all questions.
 * @returns All questions from every season.
 */
export const getAllQuestions = async (logger?: Logger): Promise<Question[]> => {
    return getQuestions(DEFAULT_SEASONS, logger);
};
