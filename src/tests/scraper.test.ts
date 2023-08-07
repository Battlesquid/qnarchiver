import { pino } from "pino";
import { fetchQuestionsFromPages } from "../modules/fetchers";
import { getScrapingUrls } from "../modules/generators";

// describe("getPageCount", () => {
//     it("shall return the correct page number when the pagination element is present", () => {
//         // TODO
//     });
// });

(async (): Promise<void> => {
    const logger = pino({ level: "trace" });
    const urls = await getScrapingUrls(["2023-2024"], logger);
    const questions = await fetchQuestionsFromPages(urls, logger);
    console.log(questions.map((q) => q.id));
})();
