import * as cheerio from "cheerio";
import SELECTORS from "../selectors";
import type { Question } from "../types";
import {
	type QnaHomeUrl,
	type QnaIdUrl,
	type QnaPageUrl,
	parseQnaUrlWithId,
} from "./parsing";

export interface ScrapedPage<U extends string = string> {
	url: U;
	html: string;
}

const unformat = (str: string | undefined | null): string => {
	return (str ?? "")
		.split(/\n/g)
		.map((n) => n.trim())
		.filter(Boolean)
		.join("");
};

// https://bugs.chromium.org/p/v8/issues/detail?id=2869
export const unleak = (str: string | undefined | null): string => {
	// biome-ignore lint: style/useTemplate
	return (" " + (str ?? "")).slice(1);
};

type HtmlPresenceRequired = "Required";
type HtmlPresenceOptional = "Optional";
type HtmlPresence = HtmlPresenceRequired | HtmlPresenceOptional;
type SelectHtml<T extends HtmlPresence> = T extends HtmlPresenceRequired
	? string
	: string | null;

const selectHtml = <T extends HtmlPresence = "Optional">(
	$: cheerio.CheerioAPI,
	selector: Parameters<cheerio.CheerioAPI>[0],
): SelectHtml<T> => {
	const text = unleak(unformat($(selector).text()));
	return (text.trim() === "" ? null : text) as SelectHtml<T>;
};

const selectRawHtml = <T extends HtmlPresence>(
	$: cheerio.CheerioAPI,
	selector: Parameters<cheerio.CheerioAPI>[0],
): SelectHtml<T> => {
	const html = unleak(unformat($(selector).html()));
	return (html.trim() === "" ? null : html) as SelectHtml<T>;
};

export const extractPageQuestions = ({
	html,
}: ScrapedPage<QnaPageUrl>): QnaIdUrl[] => {
	const $ = cheerio.load(html);
	return $(SELECTORS.URLS)
		.toArray()
		.map((el) => $(el).attr("href"))
		.filter((s): s is QnaIdUrl => s !== undefined);
};

export const extractPageCount = ({ html }: ScrapedPage<QnaHomeUrl>): number => {
	const $ = cheerio.load(html);
	const el = $(SELECTORS.PAGE_COUNT);
	return Number.isNaN(Number.parseInt(el.text()))
		? 1
		: Number.parseInt(el.text());
};

export const extractQuestion = ({
	html,
	url,
}: ScrapedPage<QnaIdUrl>): Question => {
	const $ = cheerio.load(html);

	const { id, program, season } = parseQnaUrlWithId(url);
	const author = selectHtml<"Required">($, SELECTORS.AUTHOR);
	const title = selectHtml<"Required">($, SELECTORS.TITLE);
	const question = selectHtml<"Required">($, SELECTORS.QUESTION);
	const questionRaw = selectRawHtml<"Required">($, SELECTORS.QUESTION);
	const answer = selectHtml($, SELECTORS.ANSWER);
	const answerRaw = selectRawHtml($, SELECTORS.ANSWER);
	const askedTimestamp = selectHtml<"Required">($, SELECTORS.ASKED_TIMESTAMP);
	const askedTimestampMs = new Date(askedTimestamp).getTime();
	const answeredTimestamp = selectHtml($, SELECTORS.ANSWERED_TIMESTAMP);
	const answeredTimestampMs =
		answeredTimestamp !== null ? new Date(answeredTimestamp).getTime() : null;
	const answered = answer !== null;
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
		tags,
	};
};

export const extractReadOnly = ({ html }: ScrapedPage<QnaHomeUrl>): boolean => {
	const $ = cheerio.load(html);
	return selectHtml($, SELECTORS.READONLY) !== null;
};
