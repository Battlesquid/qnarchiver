import fetch from "node-fetch"
import { load } from "cheerio"

import type { SeasonEndpointJSON } from "./types"
import { unleak, unformat } from "./stringutil"

const getYearBound = async (apiKey: string): Promise<number> => {
    const response = await fetch(`https://www.robotevents.com/api/v2/seasons?active=true`, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    });

    const { data }: SeasonEndpointJSON = await response.json();
    const { years_end } = data.find(program => program.program.code === "VRC") || { years_end: new Date(Date.now()).getFullYear() };
    return years_end;
}

const getPageCount = async (url: string) => {
    const response = await fetch(url);
    const html = unleak((await response.text()))
    const $ = load(html);
    const pageCount = +$('.pagination', '.card-body').find('li:nth-last-child(2)').text() || 1;

    return pageCount;
}

const getSeasonQuestions = async (category: string, year: number, verbose: boolean) => {
    const questions = [];
    const url = unleak(`https://www.robotevents.com/${category}/${year}-${year + 1}/QA`);
    const pageCount = await getPageCount(url);
    const urls = [];

    for (let page = 1; page <= pageCount; page++) {

        const response = await fetch(`${url}?page=${page}`);
        if (response.status === 200) {
            if (verbose)
                console.log(`OK on ${url}, page ${page}`)
            const html = unleak((await response.text()));

            const $ = load(html);
            const questions = $('.card-body').children('h4.title').toArray();
            // console.log(questions)
            for (const question of questions) {
                const url = unleak($(question).children('a').attr('href'));
                urls.push(url);
            }
        }
    }

    if (verbose)
        console.log(urls)

    for (const url of urls) {
        const response = await fetch(url);
        const html = unleak((await response.text()));
        const $ = load(html);

        const id = url.match(/QA\/(\d+)/)?.[1] ?? "";

        const title = unleak(unformat($('div.question > h4').text()))
        const question = unleak(unformat($('div.question .content-body').text()));
        const answer = unleak(unformat($('div.question .answer.approved .content-body').text()))
        const tags = unleak(unformat($('div.question .tags').children('a').map((i, el) => $(el).text().trim()).get().join(",")))
        const season = `${year}-${year + 1}`;

        questions.push({ id, url, title, question, answer, season, tags });
    }

    return questions;
}

export default async (apiKey: string, category: string, verbose: boolean) => {
    const year_bound = await getYearBound(apiKey);
    const fullQuestions = [];

    for (let seasonYear = 2018; seasonYear < year_bound; seasonYear++) {
        if (verbose)
            console.log(`Retreiving ${category} Q&As from the ${seasonYear}-${seasonYear + 1} season`)
        const data = await getSeasonQuestions(category, seasonYear, verbose);
        fullQuestions.push(...data);
    }
    return fullQuestions;
}