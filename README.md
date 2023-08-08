# vex-qna-scraper

A set of utilities focused on scraping the [VEX Robotics Q&A](https://www.robotevents.com/VRC/2023-2024/QA/).

## Usage

### Retreiving All Questions

```ts
import { getAllQuestions } from "vex-qna-scraper";

(async () => {
    const questions = await getAllQuestions();
})();
```

### Retreiving and Filtering Questions

```ts
import { getQuestions } from "vex-qna-scraper";

(async () => {
    // gets all questions from the current season
    const currentSeasonQuestions = await getQuestions();

    // get all questions from a particular season
    const specificSeasonQuestions = await getQuestions(["2020-2021"]);

    // get all VEXU questions from the 2020-2021 season
    const filteredQuestions = await getQuestions({
        VEXU: ["2020-2021"]
    });
})();
```

### Retrieving Unanswered Questions

```ts
import { getUnansweredQuestions } from "vex-qna-scraper";

(async () => {
    const questions = await getUnansweredQuestions();
})();
```
