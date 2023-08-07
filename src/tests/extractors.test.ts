import { extractPageCount, extractPageQuestions, extractQuestion } from "../modules/extractors";
import judging_home_page from "./data/judging_home_page";
import vexu_home_page from "./data/vexu_home_page";
import vrc_home_page from "./data/vrc_home_page";
import vrc_question_page from "./data/vrc_question_page";
import vrc_question_page_json from "./data/vrc_question_page_json.json";

describe("extractPageCount", () => {
    it("shall return the correct page number when the pagination element is present", () => {
        const data = extractPageCount(vrc_home_page);
        expect(data).toEqual(7);
    });

    it("shall return '1' when no pagination element is present", () => {
        const data = extractPageCount(judging_home_page);
        expect(data).toEqual(1);
    });
});

describe("extractQuestionData", () => {
    it("shall correctly extract data from a question page", () => {
        const data = extractQuestion(vrc_question_page);
        expect(data).toStrictEqual(vrc_question_page_json);
    });
});

describe("extractPageQuestions", () => {
    it("shall extract questions from a Q&A page", () => {
        const data = extractPageQuestions(vexu_home_page);
        expect(data).toEqual([
            "https://www.robotevents.com/VEXU/2023-2024/QA/1601",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1600",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1599",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1593",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1585",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1584",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1577",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1576",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1575",
            "https://www.robotevents.com/VEXU/2023-2024/QA/1574"
        ]);
    });
});
