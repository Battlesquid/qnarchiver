import { getScrapingUrls, scrapeQna } from "./scraper";
import { DEFAULT_SEASONS, getCurrentSeason, SeasonFilters } from "./seasons";

/**
 * Gets unanswered questions across all programs for the current season.
 * @returns All questions that have not been answered.
 */
export const getUnansweredQuestions = async () => {
    const season = await getCurrentSeason();
    const urls = await getScrapingUrls([season]);
    const questions = await scrapeQna(urls);
    return questions.filter(q => !q.answered);
};

/**
 * Get questions with an optional filter.
 * @param filters Optional filters to limit the results retreived. Defaults to filtering by current season.
 * @returns All questions that passed the filter.
 */
export const getQuestions = async (filters?: SeasonFilters) => {
    const queryUrls = await getScrapingUrls(filters);
    return scrapeQna(queryUrls);
};

/**
 * Gets all questions.
 * @returns All questions from every season.
 */
export const getAllQuestions = async () => {
    return getQuestions(DEFAULT_SEASONS);
};
