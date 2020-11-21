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

### `new Archiver(apiKey: string, dir?: string)`

Instantiates a new `Archiver` object using a [RobotEvents Api Key](https://www.robotevents.com/api/v2). If `dir` is provided, calling `processCategory` on the archiver will push answered Q&As to an Sqlite database at the given directory.
<br>
<br>

#### `processCategory(category: string, shouldReturn: boolean)`
Goes through the entire Q&A for a specific category across *all* seasons.