import path from "path"
import fs from "fs";
import Database from "better-sqlite3";

import type { QuestionArray } from "../database/types"
import type { Database as SqliteDatabase, Statement } from "better-sqlite3"


export default class DB {
    private _dir: string;
    instanceExists = false;

    constructor(dir: string) {
        this._dir = dir;

        try {
            const data = fs.readdirSync(dir);
            if (data.includes('qna.db')) this.instanceExists = true
        } catch (e) {
            fs.mkdirSync(dir, { recursive: true })
        }
    }

    pushQuestions(questions: QuestionArray) {

        const database = this._openDB();

        const insertQuestion = database.prepare(`INSERT INTO QNA(id, url, title, question, answer, season, tags) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        const findQuestion = database.prepare(`SELECT * FROM QNA WHERE id = ?`);

        for (const entry of questions) {
            const { id, url, title, question, answer, season, tags } = entry;
            const questionExists = Boolean(findQuestion.get(id));

            if (!questionExists)
                insertQuestion.run(id, url, title, question, answer, season, tags);
        }

        database.close();
    }

    private _openDB(): SqliteDatabase {
        const db = new Database(path.join(this._dir, "qna.db"));

        const query = `
        CREATE VIRTUAL TABLE IF NOT EXISTS QNA USING FTS5 (
            id,
            title,
            question, 
            answer, 
            season, 
            tags,
            url
        );`

        db.prepare(query).run();
        return db;
    }
}