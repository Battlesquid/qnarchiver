import { createQnaUrls, scrapeQA } from "./scraper";
import { defaultSeasons, getActiveSeason, SeasonFilters } from "./seasons";

export const getUnansweredQuestions = async (silent = true) => {
    const season = await getActiveSeason();

    const urls = await createQnaUrls([season], silent)

    const questions = await scrapeQA(urls, silent);

    return questions.filter(q => !q.answered);
}

export const getQuestions = async(filters?: SeasonFilters, silent = true) => {
    const queryUrls = await createQnaUrls(filters, silent);
    return scrapeQA(queryUrls, silent);
}

export const getAllQuestions = async(silent = true) => {
    return getQuestions(defaultSeasons, silent);
}
