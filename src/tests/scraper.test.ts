import { pino } from "pino";
import { CachedScraper } from "../modules/CachedScraper";
import { getScrapingUrls } from "../modules/generators";
import { getCurrentSeason } from "../modules/seasons";

// describe("getPageCount", () => {
//     it("shall return the correct page number when the pagination element is present", () => {
//         // TODO

//     });
// });

(async (): Promise<void> => {
    const logger = pino({ level: "trace" });
    const scraper = new CachedScraper({ logger });
    const filters = [await getCurrentSeason()];
    const queryUrls = await getScrapingUrls(filters, logger);
    const results = await scraper.scrapePages(queryUrls);
    const cachedResults = await scraper.scrapePages(queryUrls);
})();
