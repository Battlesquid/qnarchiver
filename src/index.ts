import env from "dotenv";
env.config({ path: "../.env" });
import { getYearBound, queryQuestions } from "./server/modules/queryPages";
import express from "express";

const app: express.Application = express();

(async () => {
    const year_bound = await getYearBound();
    console.log(year_bound)
    for (let year = 2018; year < year_bound; year++) {
        const res = await queryQuestions("VRC", year);
        console.log(res)
    }
})()

// const validateQuery = (category: string, keywords: string, wholeWord: string): boolean => {
//     if (!(category || keywords || wholeWord)) return false;

//     // console.log(category, keywords, wholeWord)

//     const validCategory = ["VRC", "VEXU", "VIQC", "VAIC-HS", "VAIC-U", "RAD"].includes(category);
//     const validKeywords = keywords.split(/[\+ ]/).filter(Boolean).length > 0;
//     const validWholeWord = wholeWord === "0" || wholeWord === "1";
//     return validCategory && validKeywords && validWholeWord;
// }

// app.get('/api/search', async (req, res) => {
//     const { category, keywords, wholeWord } = req.query;
//     const isValidQuery = validateQuery(category as string, keywords as string, wholeWord as string)

//     if (isValidQuery) {
//         console.log("valid query!")
//         const qnas = await queryQuestions(category as string, keywords as string, wholeWord as string);
//         res.send(qnas)
//     } else {
//         console.log("invalid query")
//     }
// })

app.listen(process.env.PORT, () => console.log("Server Started."))
