const { unleak, unformat } = require('./stringUtil');
const { load } = require('cheerio');
const fetch = require('node-fetch');

const getActiveSeason = async () => {
    const response = await fetch(`https://www.robotevents.com/api/v2/seasons?active=true`, {
        headers: {
            "Authorization": `Bearer ${process.env.ROBOT_EVENTS_KEY}`
        }
    });
    const { data } = await response.json();
    const { years_start, years_end } = data.find(program => program.program.code === "VRC");
    return { years_start, years_end };
}

const getPageCount = async url => {
    const response = await fetch(url);
    const html = unleak((await response.text()))
    const $ = load(html);
    const baseCount = parseInt(unleak($('.pagination', '.panel-body').find('li').length));
    const pageCount = baseCount - (baseCount > 2 ? 2 : 0) + (baseCount === 0 ? 1 : 0);
    return pageCount;
}

export const queryQuestions = async (category, query, wholeWord) => {
    const ids = [];

    const { years_start, years_end } = await getActiveSeason();
    const pageCount = await getPageCount(`https://www.robotevents.com/${category}/${years_start}-${years_end}/QA`);

    const boundary = wholeWord ? "\\b" : "";
    const reformattedQuery = query.split(" ")
        .map(word => `${boundary}(${word})${boundary}`).join("|");

    console.log(reformattedQuery);

    const queryRegex = new RegExp(reformattedQuery, "mg");
    console.log(queryRegex)

    const urls = [];

    for (let i = 1; i <= pageCount; i++) {
        const response = await fetch(`https://www.robotevents.com/${category}/${years_start}-${years_end}/QA?page=${i}`);
        const html = unleak((await response.text()));

        const $ = load(html);
        const questions = $('.panel-body').children('h4.title').toArray();

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

        const questionBody = unleak($('div.content-body').text());

        if (queryRegex.test(questionBody))
            queriedURLs.push(url);

    }

    console.log(`Found ${queriedURLs.length} results`, queriedURLs);

    return queriedURLs;
}