import { parsepdf } from "node-pdf-parser";
import { getDefaultFetcherOptions } from "../clients";
import { FetcherOptions } from "./fetchers";

export const RULE_TABLE_PATTERN = /(?<name><[A-Z]+\d+>) (?<summary>[A-Z](?:.+\.?))+?/g;

export interface Rule {
    name: string;
    summary: string;
}

export const extractRules = async (url: string, options?: FetcherOptions): Promise<Rule[] | null> => {
    const logger = options?.logger?.child({ label: "extractRules" });
    const { client, teardown } = await getDefaultFetcherOptions(options);
    const buffer = await client.buffer(url);
    if (buffer === null) {
        return null;
    }
    const content = await parsepdf(buffer);
    const text = content.pages.join("\n");
    const matches = Array.from(text.matchAll(RULE_TABLE_PATTERN));
    const rules: Rule[] = [];
    for (const match of matches) {
        const name = match.groups?.name;
        const summary = match.groups?.summary;
        if (name === undefined || summary === undefined || rules.find(r => r.name === name)) {
            logger?.trace(`Already added rule ${name}, skipping.`)
            continue;
        }
        logger?.debug("Adding new rule: ", name);
        rules.push({ name, summary });
    }
    if (teardown) {
        await client.teardown();
    }
    logger?.debug(`Found ${rules.length} rules.`);
    return rules;
}
