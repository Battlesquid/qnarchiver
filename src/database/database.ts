import fs from "fs";
import Database from "better-sqlite3";

import type { QuestionArray } from "../database/types"

export default class DB {
    private _database;
    private _statements: { [key: string]: any };

    constructor(dir: string) {
        try {
            fs.mkdirSync(dir, { recursive: true }); 
        }
        catch (e) { /* already exists */ }

        this._database = new Database(dir + "/qna.db")

        const query = `
        CREATE VIRTUAL TABLE IF NOT EXISTS QNA USING FTS5 (
            id,
            url, 
            question, 
            answer, 
            season,
            title
        );`
        this._database.prepare(query).run();

        this._statements = {
            archiveEntry: this._database.prepare(`INSERT INTO QNA(id, url, title, question, answer, season) VALUES (?, ?, ?, ?, ?, ?)`),
            entryExists(id: string) {
                return this._database.prepare(`SELECT * FROM QNA WHERE id MATCH '${id}'`)
            },
            matchField(field: "title" | "question" | "answer", content: string) {
                return this._database.prepare(`SELECT * FROM QNA WHERE ${field} MATCH '${content}'`);
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
}