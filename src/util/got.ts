/**
 * From @crawlee/util
 */

// @ts-expect-error Okay because we only import a type.
import type { GotScraping } from "got-scraping";

let gotScraping = (async (...args: Parameters<GotScraping>) => {
    ({ gotScraping } = await import("got-scraping"));
    return gotScraping(...args);
}) as GotScraping;

export { gotScraping };
