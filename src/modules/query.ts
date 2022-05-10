import { createQnaUrls, scrapeQA } from "./scraper"
import { defaultSeasons, pingQA, SeasonFilters } from "./seasons"

export const getUnansweredQuestions = async (silent = true) => {
    const year = new Date().getFullYear();
    const newSeason = await pingQA("VRC", `${year}-${year + 1}`);

    const urls = newSeason
        ? await createQnaUrls([`${year}-${year + 1}`], silent)
        : await createQnaUrls([`${year - 1}-${year}`], silent)

    const questions = await scrapeQA(urls, silent);

    return questions.filter(q => q.answered === false);
}

export const getQuestions = async(filters?: SeasonFilters, silent = true) => {
    const queryUrls = await createQnaUrls(filters, silent);
    return scrapeQA(queryUrls, silent);
}

export const getAllQuestions = async(silent = true) => {
    return getQuestions(defaultSeasons, silent);
}