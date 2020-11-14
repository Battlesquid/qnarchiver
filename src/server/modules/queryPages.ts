import { unleak, unformat } from "./stringutil"
import type { SeasonEndpointJSON } from "../types"
import { load } from "cheerio"
import fetch from "node-fetch"


export const getYearBound = async (): Promise<number> => {
    const response = await fetch(`https://www.robotevents.com/api/v2/seasons?active=true`, {
        headers: {
            "Authorization": `Bearer ${process.env.ROBOT_EVENTS_KEY}`
        }
    });
    const { data }: SeasonEndpointJSON = await response.json();
    const { years_end } = data.find(program => program.program.code === "VRC");
    return +years_end;
}

const getPageCount = async (url: string) => {
    const response = await fetch(url);
    const html = unleak((await response.text()))
    const $ = load(html);
    const baseCount = $('.pagination', '.panel-body').find('li').length;
    const pageCount = baseCount - (baseCount > 2 ? 2 : 0) + (baseCount === 0 ? 1 : 0);
    return pageCount;
}

export const queryQuestions = async (category: string, year: number) => {

    // const { years_start, years_end } = await getActiveSeason();
    const pageCount = await getPageCount(`https://www.robotevents.com/${category}/${year}-${year + 1}/QA`);

    // const boundary = wholeWord ? "\\b" : "";
    // const reformattedQuery = query.split(" ")
    //     .map(word => `${boundary}(${word})${boundary}`).join("|");

    // console.log(reformattedQuery);

    // const queryRegex = new RegExp(reformattedQuery, "mg");
    // console.log(queryRegex)

    const urls = [];

    for (let i = 1; i <= pageCount; i++) {
        const response = await fetch(`https://www.robotevents.com/${category}/${year}-${year + 1}/QA?page=${i}`);
        const html = unleak((await response.text()));

        const $ = load(html);
        const questions = $('.panel-body').children('h4.title:has(a span)').toArray();

        for (const question of questions) {
            const url = unleak($(question).children('a').attr('href'));
            urls.push(url);
        }
    }

    const queriedURLs = [];

    for (const url of urls) {
        const response = await fetch(url);
        const html = unleak((await response.text()));
        const $ = load(html);

        const questionBody = unleak(unformat($('div.question .content-body').text()));
        const questionAnswer = unleak(unformat($('div.question .answer.approved .content-body').text()))
        // if (queryRegex.test(questionBody))
        queriedURLs.push({
            url,
            body: questionBody,
            answer: questionAnswer
        });

    }

    console.log(`Found ${queriedURLs.length} results`, queriedURLs);

    return queriedURLs;
}