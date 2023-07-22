import { createQnaUrls, scrapeQA } from "./scraper";
import { DEFAULT_SEASONS, getActiveSeason, SeasonFilters } from "./seasons";

/**
 * Gets unanswered questions across all programs for the current season.
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async () => {
    const season = await getActiveSeason();
    const urls = await createQnaUrls([season]);
    const questions = await scrapeQA(urls);
    return questions.filter(q => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (filters?: SeasonFilters) => {
    const queryUrls = await createQnaUrls(filters);
    return scrapeQA(queryUrls);
};

/**
 * Gets all questions.
 * @returns All questions from every season.
 */
export const getAllQuestions = async () => {
    return getQuestions(DEFAULT_SEASONS);
};
