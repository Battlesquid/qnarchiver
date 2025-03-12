import { extractPageCount, extractPageQuestions, extractQuestion, extractReadOnly } from "../src/modules/extractors";
import judging_home_page from "./data/judging_home_page";
import vurc_home_page from "./data/vurc_home_page";
import v5rc_home_page from "./data/v5rc_home_page";
import v5rc_question_page from "./data/v5rc_question_page";
import v5rc_question_page_json from "./data/v5rc_question_page_json";
import v5rc_non_readonly_page from "./data/v5rc_non_readonly_page";
import { describe, expect, it, test } from "vitest";

describe("extractPageCount", () => {
    it("shall return the correct page number when the pagination element is present", () => {
        const data = extractPageCount(v5rc_home_page);
        expect(data).toEqual(28);
    });

    it("shall return '1' when no pagination element is present", () => {
        const data = extractPageCount(judging_home_page);
        expect(data).toEqual(1);
    });
});

describe("extractQuestionData", () => {
    it("shall correctly extract data from a question page", () => {
        const data = extractQuestion(v5rc_question_page);
        expect(data).toStrictEqual(v5rc_question_page_json);
    });
});

describe("extractPageQuestions", () => {
    it("shall extract questions from a Q&A page", () => {
        const data = extractPageQuestions(vurc_home_page);
        expect(data).toEqual([
            "https://www.robotevents.com/VURC/2023-2024/QA/1969",
            "https://www.robotevents.com/VURC/2023-2024/QA/1946",
            "https://www.robotevents.com/VURC/2023-2024/QA/1945",
            "https://www.robotevents.com/VURC/2023-2024/QA/1942",
            "https://www.robotevents.com/VURC/2023-2024/QA/1932",
            "https://www.robotevents.com/VURC/2023-2024/QA/1927",
            "https://www.robotevents.com/VURC/2023-2024/QA/1925",
            "https://www.robotevents.com/VURC/2023-2024/QA/1924",
            "https://www.robotevents.com/VURC/2023-2024/QA/1923",
            "https://www.robotevents.com/VURC/2023-2024/QA/1922"
        ]);
    });
});

describe("extractReadOnly", () => {
    it("shall extract the readonly status from a Q&A page", () => {
        expect(extractReadOnly(v5rc_home_page)).toBe(true);
        expect(extractReadOnly(v5rc_non_readonly_page)).toBe(false);
    })
})
