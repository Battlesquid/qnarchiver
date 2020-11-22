import retreiveQuestions from "./modules/fetchPages";
import ArchiverDatabase from "./database/database"
import path from "path";

export default class Archiver {

    private _database;
    private _apiKey;

    constructor(apiKey: string, dir?: string) {
        if (dir)
            this._database = new ArchiverDatabase(dir);
        this._apiKey = apiKey;
    }

    async processCategory(categories: string | string[], shouldReturn?: boolean) {

        if (Array.isArray(categories)) {
            const allQuestions = [];

            for (const category of categories) {
                const questions = await retreiveQuestions(this._apiKey, category);

                if (this._database)
                    this._database.pushQuestions(questions)
                if (shouldReturn)
                    allQuestions.push(...questions);
            }
            if (shouldReturn) return allQuestions;

        } else if (typeof categories === "string") {
            const questions = await retreiveQuestions(this._apiKey, categories);

            if (this._database)
                this._database.pushQuestions(questions)

            if (shouldReturn) return questions;
        } else {
            throw Error("Category must be a string or array.")
        }
    }
} 