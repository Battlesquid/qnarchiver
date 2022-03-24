# qnarchiver

A tool to retreive and archive questions from the VEX Robotics Q&A.

```js
import { archive } from "vex-qna-archiver";

archive({
  dbName: "QA",
  dbType: "sqlite",
  filters: {
    VRC: ["2020-2021"]
  }
});
```

# Options

`dbName`: The name of the database to save to

`dbType`: The type of database to save the data to. Can be `sqlite`, `postgresql`, `mongo`, `mariadb`, or `mysql`.

`filters?`: An option to filter Q&As by season. Excluding this option or leaving it empty will retreive all Q&As.