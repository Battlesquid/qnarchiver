import { createQnaUrls, scrapeQA } from "./scraper";
import { defaultSeasons, getActiveSeason, SeasonFilters } from "./seasons";

export const getUnansweredQuestions = async () => {
    const season = await getActiveSeason();

    const urls = await createQnaUrls([season])

    const questions = await scrapeQA(urls);

    return questions.filter(q => !q.answered);
}

export const getQuestions = async(filters?: SeasonFilters) => {
    const queryUrls = await createQnaUrls(filters);
    return scrapeQA(queryUrls);
}

export const getAllQuestions = async() => {
    return getQuestions(defaultSeasons);
}
