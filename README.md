# qarchiver

A tool to retreive and archive questions from the VEX Robotics Q&A.

## Example Usage

```js
import Archiver from "qarchiver";

const apiKey = "LAIFHLUefhoiFEHOIufhlifehliFEHluifhlUF";
const archiver = new Archiver(apiKey, "path/to/database");

(async() {
    const data = await archiver.processCategory("VRC", true);
    console.log(data);
})()
```
