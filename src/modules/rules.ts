import { parsepdf } from "node-pdf-parser";
import fs from "fs/promises";
import { FetcherOptions } from "./fetchers";
import { getDefaultFetcherOptions } from "../clients";

const RULE_TABLE_PATTERN = /(?<rule><[A-Z]+\d+>) (?<summary>[A-Z](?:.+\.?))+?/g;

export const extractRules = async (url: string, options?: FetcherOptions) => {
    const { client, teardown } = await getDefaultFetcherOptions(options);
    const pdf = await client.fetch(url);
    
    if (teardown) {
        await client.teardown();
    }
}

(async () => {
    const { buffer } = await fs.readFile("HighStakes-3.0.pdf");
    const content = await parsepdf(buffer);
    const text = content.pages.join("\n");
    const matches = Array.from(text.matchAll(RULE_TABLE_PATTERN)).map(m => m[0]);
    const rules: string[] = [];
    for (const match of matches) {
        const rule = extractRule(match)
        if (rules.find(r => extractRule(r) === rule)) {
            continue;
        }
        console.log("found new rule ", rule)
        rules.push(match);
    }
    console.log(rules)
    console.log(JSON.stringify(rules))
})();