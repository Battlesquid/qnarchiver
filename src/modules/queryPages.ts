import fetch from "node-fetch"
import { load } from "cheerio"

import type { SeasonEndpointJSON } from "./types"
import { unleak, unformat } from "./stringutil"
import archiveToDatabase from "../database/database"

const getYearBound = async (): Promise<number> => {
    const response = await fetch(`https://www.robotevents.com/api/v2/seasons?active=true`, {
        headers: {
            "Authorization": `Bearer ${process.env.ROBOT_EVENTS_KEY}`
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
    const pageCount = +$('.pagination', '.panel-body').find('li:nth-last-child(2)').text() || 1;

    return pageCount;
}

const getSeasonQuestions = async (category: string, year: number) => {

    const url = unleak(`https://www.robotevents.com/${category}/${year}-${year + 1}/QA`);
    const pageCount = await getPageCount(url);

    const urls = [];

    for (let page = 1; page <= pageCount; page++) {

        const response = await fetch(`${url}?page=${page}`);
        if (response.status === 200) {
            console.log(`OK on ${url}, page ${page}`)
            const html = unleak((await response.text()));

            const $ = load(html);
            const questions = $('.panel-body').children('h4.title:has(a span)').toArray();

            for (const question of questions) {
                const url = unleak($(question).children('a').attr('href'));
                urls.push(url);
            }
        }
    }

    console.log(`Found ${urls.length} questions: `, urls, "\n")

    for (const url of urls) {
        const response = await fetch(url);
        const html = unleak((await response.text()));
        const $ = load(html);

        const id = url.match(/QA\/(\d+)/)?.[1] ?? "";
        console.log(url.match(/QA\/(\d+)/))

        const title = unleak(unformat($('div.question h4').text()))
        const question = unleak(unformat($('div.question .content-body').text()));
        const answer = unleak(unformat($('div.question .answer.approved .content-body').text()))
        const season = `${year}-${year + 1}`;

        archiveToDatabase(category.replace("-", "") + id, url, title, question, answer, season)

    }
}

export const archiveCategory = async (category: string) => {
    const year_bound = await getYearBound();
    for (let seasonYear = 2018; seasonYear < year_bound; seasonYear++) {
        await getSeasonQuestions(category, seasonYear);
    }
}