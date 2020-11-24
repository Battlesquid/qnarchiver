import path from "path"
import fs from "fs";
import Database from "better-sqlite3";

import type { QuestionArray } from "../database/types"

export default class DB {
    private _instance;
    private _statements: { [key: string]: any };
    _instanceExists = false;

    constructor(dir: string) {

        try {
            const data = fs.readdirSync(dir);
            if (data.includes('qna.db')) this._instanceExists = true
        } catch (e) {
            fs.mkdirSync(dir, { recursive: true })
        }

        this._instance = new Database(path.join(dir, "qna.db"))

        const query = `
        CREATE VIRTUAL TABLE IF NOT EXISTS QNA USING FTS5 (
            id,
            url, 
            question, 
            answer, 
            season, 
            title
        );`
        this._instance.prepare(query).run();

        this._statements = {
            archiveEntry: this._instance.prepare(`INSERT INTO QNA(id, url, title, question, answer, season) VALUES (?, ?, ?, ?, ?, ?)`),
            entryExists: (id: string) => {
                return this._instance.prepare(`SELECT * FROM QNA WHERE id MATCH '${id}'`)
            }
        }
    }

    async pushQuestions(questions: QuestionArray) {

        for (const entry of questions) {
            const { id, url, title, question, answer, season } = entry;
            const questionExists = this._statements.entryExists(id).get();

            if (questionExists) return;
            this._statements.archiveEntry.run(id, url, title, question, answer, season);
        }
    }

    closeConnection() {
        this._instance.close();
    }
}