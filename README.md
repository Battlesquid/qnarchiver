# vex-qna-archiver

A tool to retreive and archive questions from the VEX Robotics Q&A.

```js
import Archiver from "vex-qna-archiver";

const apiKey = "LAIFHLUefhoiFEHOIufhlifehliFEHluifhlUF";
const archiver = new Archiver(apiKey, "path/to/database");

(async() {
    const data = await archiver.processCategory("VRC", true);
    console.log(data);
})()
```

# Docs

### `new Archiver(apiKey: string, dir?: string): Archiver`

Instantiates a new `Archiver` object using a [RobotEvents Api Key](https://www.robotevents.com/api/v2). If `dir` is provided, calling `processCategory` on the archiver will push answered Q&As to an Sqlite database at the given directory.
<br>
<br>

#### `processCategory(category: string | string[], shouldReturn?: boolean): QuestionArray | undefined`

Goes through the entire Q&A for a specific category (or categories using an array) across _all_ seasons. If a path was specified for the database, retreived questions will be stored. 
\
\
By default this method will not return the retreived questions, but you can return them by setting `shouldReturn` to `true`.
