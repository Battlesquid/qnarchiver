# scraper

A set of utilities focused on scraping the [VEX Robotics Q&A](https://www.robotevents.com/V5RC/2024-2025/QA/).

## Usage

```ts
import { 
    getAllQuestions,
    getQuestions,
    getUnansweredQuestions
} from "@qnaplus/scraper";

(async () => {
    const questions = await getAllQuestions();

    // gets all questions from the current season
    const currentSeasonQuestions = await getQuestions();

    // get all questions from a particular season
    const specificSeasonQuestions = await getQuestions(["2020-2021"]);

    // get all VURC questions from the 2020-2021 season
    const filteredQuestions = await getQuestions({
        VURC: ["2020-2021"]
    });

    // Get all unanswered questions for the current season
    const questions = await getUnansweredQuestions();
})();
```

## Logging

`@qnaplus/scraper` supports logging through [pino](https://github.com/pinojs/pino). This means that for most functions, you can provide a logger instance to trace the operations within the function, like so:

```ts
import { getUnansweredQuestions } from "@qnaplus/scraper";
import { pino } from "pino";

(async () => {
    const logger = pino();
    const questions = await getUnansweredQuestions({ logger });
})();
```

## Strategies

At times, the default strategy (powered by [got-scraping](https://github.com/apify/got-scraping)) used to make requests will fail. `@qnaplus/scraper` allows you to pass custom clients to work around this. Create your own or install [@qnaplus/scraper-strategies](https://github.com/qnaplus/scraper-strategies) for additional clients.

```ts
import { getUnansweredQuestions } from "@qnaplus/scraper";
import { CurlImpersonateScrapingClient } from "@qnaplus/scraper-strategies";
import { pino } from "pino";

(async () => {
    const logger = pino();
    const questions = await getUnansweredQuestions({ 
        logger,
        client: new CurlImpersonateScrapingClient(logger)
    });
})();
```

## Contributing

1. Clone the repository. Ensure you have [volta](https://volta.sh/) installed, or you are using the nodejs/yarn versions defined in the `volta` field in the `package.json`.
2. Add your contribution(s) and commit them. This project loosely follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
3. In a separate commit, run `yarn neat`.
4. In a separate commit, bump the version.
