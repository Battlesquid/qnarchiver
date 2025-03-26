import { describe, expect, it, test } from "vitest";
import {
	type QnaHomeUrl,
	type QnaIdUrl,
	type QnaPageUrl,
	buildHomeQnaUrl,
	buildQnaUrlWithId,
	buildQnaUrlWithPage,
	parseQnaUrlWithId,
	parseQnaUrlWithPage,
	validateQnaUrl,
} from "../src/modules/parsing";

const TEST_SEASON = "2023-2024";
const TEST_PROGRAM = "V5RC";
const TEST_QUESTION_ID = "1591";
const TEST_PAGE_NUM = 1;

const VALID_HOME_URL: QnaHomeUrl = `https://www.robotevents.com/${TEST_PROGRAM}/${TEST_SEASON}/QA`;
const VALID_QUESTION_URL: QnaIdUrl = `https://www.robotevents.com/${TEST_PROGRAM}/${TEST_SEASON}/QA/${TEST_QUESTION_ID}`;
const VALID_PAGINATED_URL: QnaPageUrl = `https://www.robotevents.com/${TEST_PROGRAM}/${TEST_SEASON}/QA?page=${TEST_PAGE_NUM}`;
const INVALID_URL = "INVALID_URL";

describe("validateQnaUrl", () => {
	it("shall throw when the url is in an invalid format", () => {
		expect(() => validateQnaUrl(INVALID_URL)).toThrow();
	});
	it("shall returned the url as a parsed object when the url is valid", () => {
		const parsed = validateQnaUrl(VALID_HOME_URL);
		expect(parsed).toEqual({ program: TEST_PROGRAM, season: TEST_SEASON });
	});
});

describe("Parsing Functions", () => {
	it("shall parse question page urls", () => {
		const parsed = parseQnaUrlWithId(VALID_QUESTION_URL);
		expect(parsed).toEqual({
			program: TEST_PROGRAM,
			season: TEST_SEASON,
			id: TEST_QUESTION_ID,
		});
	});

	it("shall parse paginated Q&A urls", () => {
		const parsed = parseQnaUrlWithPage(VALID_PAGINATED_URL);
		expect(parsed).toEqual({
			program: TEST_PROGRAM,
			season: TEST_SEASON,
			page: TEST_PAGE_NUM,
		});
	});
});

describe("Builder Functions", () => {
	it("shall build the correct home url", () => {
		const url = buildHomeQnaUrl({ program: TEST_PROGRAM, season: TEST_SEASON });
		expect(url).toEqual(VALID_HOME_URL);
	});

	it("shall build the correct id url", () => {
		const url = buildQnaUrlWithId({
			program: TEST_PROGRAM,
			season: TEST_SEASON,
			id: TEST_QUESTION_ID,
		});
		expect(url).toEqual(VALID_QUESTION_URL);
	});

	it("shall build the correct paginated url", () => {
		const url = buildQnaUrlWithPage({
			program: TEST_PROGRAM,
			season: TEST_SEASON,
			page: TEST_PAGE_NUM,
		});
		expect(url).toEqual(VALID_PAGINATED_URL);
	});
});
