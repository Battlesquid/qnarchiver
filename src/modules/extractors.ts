import cheerioModule from "cheerio";
import { QnaHomeUrl, QnaIdUrl, QnaPageUrl, parseQnaUrlWithId } from "./parsing";
import SELECTORS from "../selectors.json";
import { Question } from "../types";

export interface ScrapedPage<U extends string = string> {
    url: U;
    html: string;
}

const unformat = (str: string): string => {
    return str
        .split(/\n/g)
        .map((n) => n.trim())
        .filter(Boolean)
        .join("");
};

// https://bugs.chromium.org/p/v8/issues/detail?id=2869
export const unleak = (str: string | undefined): string => {
    return (" " + str).slice(1);
};

const selectHtml = ($: cheerio.Root, selector: string | cheerio.Element): string => {
    return unleak(unformat($(selector).text()));
};

const selectRawHtml = ($: cheerio.Root, selector: string | cheerio.Element): string => {
    return unleak(unformat($(selector).html() ?? ""));
};

export const extractQuestionUrls = ({ html }: ScrapedPage<QnaPageUrl>): QnaIdUrl[] => {
    const $ = cheerioModule.load(html);
    return $(SELECTORS.URLS)
        .toArray()
        .map((el) => $(el).attr("href"))
        .filter((s): s is QnaIdUrl => s !== undefined);
};

export const extractPageCount = ({ html }: ScrapedPage<QnaHomeUrl>): number => {
    const $ = cheerioModule.load(html);
    const el = $(SELECTORS.PAGE_COUNT);
    return Number.isNaN(parseInt(el.text())) ? 1 : parseInt(el.text());
};

export const extractQuestion = ({ html, url }: ScrapedPage<QnaIdUrl>): Question => {
    const $ = cheerioModule.load(html);

    const { id, program, season } = parseQnaUrlWithId(url);
    const author = selectHtml($, SELECTORS.AUTHOR);
    const title = selectHtml($, SELECTORS.TITLE);
    const question = selectHtml($, SELECTORS.QUESTION);
    const questionRaw = selectRawHtml($, SELECTORS.QUESTION);
    const answer = selectHtml($, SELECTORS.ANSWER);
    const answerRaw = selectRawHtml($, SELECTORS.ANSWER);
    const askedTimestamp = selectHtml($, SELECTORS.ASKED_TIMESTAMP);
    const askedTimestampMs = new Date(askedTimestamp).getTime();
    const answeredTimestamp = selectHtml($, SELECTORS.ANSWERED_TIMESTAMP);
    const answeredTimestampMs = new Date(answeredTimestamp).getTime();
    const answered = Boolean(answer);
    const tags = $(SELECTORS.TAGS)
        .map((_i, el) => unleak($(el).text().trim()))
        .get();

    return {
        id,
        url,
        program,
        season,
        author,
        title,
        question,
        questionRaw,
        answer,
        answerRaw,
        askedTimestamp,
        askedTimestampMs,
        answeredTimestamp,
        answeredTimestampMs,
        answered,
        tags
    };
};
