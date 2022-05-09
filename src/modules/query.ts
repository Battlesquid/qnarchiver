import { createQnaUrls, scrapeQA } from "./scraper"
import { defaultSeasons, pingQA, SeasonFilters } from "./seasons"

export const getUnansweredQuestions = async () => {
    const year = new Date().getFullYear();
    const newSeason = await pingQA("VRC", `${year}-${year + 1}`);

    const urls = newSeason
        ? await createQnaUrls([`${year}-${year + 1}`])
        : await createQnaUrls([`${year - 1}-${year}`])

    const questions = await scrapeQA(urls);

    return questions.filter(q => q.answered === false);
}

export const getQuestions = async(filters?: SeasonFilters) => {
    const queryUrls = await createQnaUrls(filters);
    return scrapeQA(queryUrls);
}

export const getAllQuestions = async() => {
    return getQuestions(defaultSeasons);
}