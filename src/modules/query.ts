import { Question, getScrapingUrls, scrapeQnaPages } from "./scraper";
import { DEFAULT_SEASONS, getCurrentSeason, SeasonFilters } from "./seasons";

/**
 * Utility wrapper around {@link getQuestions} that gets unanswered questions.
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async (): Promise<Question[]> => {
    const questions = await getQuestions();
    return questions.filter(q => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (filters?: SeasonFilters): Promise<Question[]> => {
    if (filters === undefined) {
        filters = [await getCurrentSeason()];
    }
    const queryUrls = await getScrapingUrls(filters);
    return scrapeQnaPages(queryUrls);
};

/**
 * Gets all questions.
 * @returns All questions from every season.
 */
export const getAllQuestions = async (): Promise<Question[]> => {
    return getQuestions(DEFAULT_SEASONS);
};
