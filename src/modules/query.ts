import { Logger } from "pino";
import { Question, getScrapingUrls, scrapeQnaPages } from "./scraper";
import { DEFAULT_SEASONS, getCurrentSeason, QnaFilters } from "./seasons";

/**
 * Utility wrapper around {@link getQuestions} that gets unanswered questions for the current season.
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async (logger?: Pick<Logger, "trace">): Promise<Question[]> => {
    const questions = await getQuestions(undefined, logger);
    return questions.filter((q) => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (filters?: QnaFilters, logger?: Pick<Logger, "trace">): Promise<Question[]> => {
    if (filters === undefined) {
        filters = [await getCurrentSeason()];
    }
    const queryUrls = await getScrapingUrls(filters, logger);
    return scrapeQnaPages(queryUrls, logger);
};

/**
 * Gets all questions.
 * @returns All questions from every season.
 */
export const getAllQuestions = async (logger?: Pick<Logger, "trace">): Promise<Question[]> => {
    return getQuestions(DEFAULT_SEASONS, logger);
};
