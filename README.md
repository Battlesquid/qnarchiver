# qnarchiver

A set of utilities to retreive and archive questions from the VEX Robotics Q&A.

## Usage

### Retreiving Questions
```ts
import { createQnaUrls, scrapeQA } from "vex-qna-archiver";

(async() => {
  const questions = await getAllQuestions();
})();
```

### Retrieving Unanswered Questions
```ts
import { getUnansweredQuestions } from "vex-qna-archiver";

(async () => {
  const questions = await getUnansweredQuestions();
})();
```

### Archiving Questions (experimental)
```ts
import { archive } from "vex-qna-archiver";

archive({
  dbName: "QA",
  dbType: "sqlite",
  filters: {
    VRC: ["2020-2021"]
  }
});
```

## Question Structure
In case you wish to use the question data in a different way (eg, you retreived the questions via `getAllQuestions` or `getUnansweredQuestions`), the format/schema is as follows:
```
{
  "id": string,
  "author": string,
  "category": string,
  "title": string,
  "question": string,
  "answer": string,
  "season": string,
  "timestamp": string,
  "answered": boolean,
  "tags": string[]
}
```

## Options

`dbName`: The name of the database to save to

`dbType`: The type of database to save the data to. Can be `sqlite`, `postgresql`, `mongo`, `mariadb`, or `mysql`.

`filters?`: An option to filter Q&As by season. Excluding this option or leaving it empty will retreive all Q&As.