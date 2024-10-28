import { getOldestUnansweredQuestion } from "../src/index";
import {
    OLDEST_TEST_QUESTION_UNIQUE_DATES,
    OLDEST_TEST_QUESTIONS_MIXED_OVERLAPPING_DATES,
    OLDEST_TEST_QUESTIONS_OVERLAPPING_DATES,
    TEST_QUESTIONS_MIXED_OVERLAPPING_DATES,
    TEST_QUESTIONS_OVERLAPPING_DATES,
    TEST_QUESTIONS_UNIQUE_DATES,
    TEST_SEASON
} from "./data/test_questions";

describe("getOldestUnansweredQuestion", () => {
    it("should get the oldest unanswered question when dates are unique", () => {
        expect(getOldestUnansweredQuestion(TEST_QUESTIONS_UNIQUE_DATES, TEST_SEASON)).toEqual(OLDEST_TEST_QUESTION_UNIQUE_DATES);
    });

    it("should get the oldest unanswered question when dates overlap", () => {
        expect(getOldestUnansweredQuestion(TEST_QUESTIONS_OVERLAPPING_DATES, TEST_SEASON)).toEqual(OLDEST_TEST_QUESTIONS_OVERLAPPING_DATES);
    });

    it("should get the oldest unanswered question when the list of questions is out of order", () => {
        expect(getOldestUnansweredQuestion(TEST_QUESTIONS_MIXED_OVERLAPPING_DATES, TEST_SEASON)).toEqual(OLDEST_TEST_QUESTIONS_MIXED_OVERLAPPING_DATES);
    });
});
