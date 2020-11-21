import path from "path";
import Database from "better-sqlite3";

const initDatabase = () => {
    const database = new Database(path.resolve(__dirname, '../../db/qna.db'), { verbose: console.log })
    const query = `
    CREATE VIRTUAL TABLE IF NOT EXISTS QNA USING FTS5 (
        id,
        url, 
        question, 
        answer, 
        season,
        title
    );`
    const stmt = database.prepare(query);
    stmt.run();
    return database;
}

const database = initDatabase();
const statements = {
    archiveEntry: database.prepare(`INSERT INTO QNA(id, url, title, question, answer, season) VALUES (?, ?, ?, ?, ?, ?)`),
    entryExists(id: string) {
        return database.prepare(`SELECT * FROM QNA WHERE id MATCH '${id}'`)
    },
    matchField(field: "title" | "question" | "answer", content: string) {
        return database.prepare(`SELECT * FROM QNA WHERE ${field} MATCH '${content}'`);
    }
}

export default (id: string, url: string, title: string, question: string, answer: string, season: string) => {
    const questionExists = statements.entryExists(id).get();
    if (questionExists) return;
    console.log(`Adding Q&A ${id} to the database...`)
    statements.archiveEntry.run(id, url, title, question, answer, season);
}