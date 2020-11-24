# vex-qna-archiver

A tool to retreive and archive questions from the VEX Robotics Q&A.

```js
import Archiver from "vex-qna-archiver";

const apiKey = "LAIFHLUefhoiFEHOIufhlifehliFEHluifhlUF";
const archiver = new Archiver(apiKey, {
  dir: "../db"
});

(async () => {
  const data = await archiver.processCategory("Judging", true);
  console.log(data);
})();
```

# Docs

### `new Archiver(apiKey: string, options?: ArchiverOptions): Archiver`

Instantiates a new `Archiver` object using a [RobotEvents Api Key](https://www.robotevents.com/api/v2). 

`options.dir: string`: If specified, the archiver will store the questions in an sqlite database at the given location.
\
`options.verbose: boolean`: False by default, setting this to true will log some verbose data as the archiver is going through the Q&As.
<br>
<br>

#### `processCategory(category: string | string[], force?: boolean, shouldReturn?: boolean): QuestionArray | undefined`

Goes through the entire Q&A for a specific category (or categories using an array) across _all_ seasons. If a path was specified for the database, retreived questions will be stored.
\
\
By default, if a database already exists at the given path, the archiver will exit; setting `force` to `true` will force the archiver to run anyways.
\
\
By default this method will not return the retreived questions, but you can return them by setting `shouldReturn` to `true`.
