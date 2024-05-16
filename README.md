# vex-qna-archiver

A set of utilities focused on scraping the [VEX Robotics Q&A](https://www.robotevents.com/V5RC/2024-2025/QA/).

## Usage

### Retreiving All Questions

```ts
import { getAllQuestions } from "vex-qna-archiver";

(async () => {
    const questions = await getAllQuestions();
})();
```

### Retreiving and Filtering Questions

```ts
import { getQuestions } from "vex-qna-archiver";

(async () => {
    // gets all questions from the current season
    const currentSeasonQuestions = await getQuestions();

    // get all questions from a particular season
    const specificSeasonQuestions = await getQuestions(["2020-2021"]);

    // get all VURC questions from the 2020-2021 season
    const filteredQuestions = await getQuestions({
        VURC: ["2020-2021"]
    });
})();
```

### Retrieving Unanswered Questions

```ts
import { getUnansweredQuestions } from "vex-qna-archiver";

(async () => {
    const questions = await getUnansweredQuestions();
})();
```
