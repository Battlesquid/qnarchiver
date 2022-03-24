import { createQnaUrls, scrapeQA } from "./scraper"
import { pingQA } from "./seasons"

export const getUnansweredQuestions = async () => {
    const year = new Date().getFullYear();
    const newSeason = await pingQA("VRC", `${year}-${year + 1}`);

    const urls = newSeason
        ? await createQnaUrls([`${year}-${year + 1}`])
        : await createQnaUrls([`${year - 1}-${year}`])

    const questions = await scrapeQA(urls);

    return questions.filter(q => q.answered === false);
}
