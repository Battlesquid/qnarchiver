# qnarchiver

A tool to retreive and archive questions from the VEX Robotics Q&A.

```js
import { archive } from "vex-qna-archiver";

archive({
  dbName: "QNA",
  dbType: "sqlite",
  filters: {
    VRC: [SeasonYears.2018_2019, SeasonYears.2020_2021],
    VEXU: [SeasonYears.2019_2020]
  }
})
```

# Options

`dbName`: The name of the database to save to

`dbType`: The type of database to save the data to. Can be `sqlite`, `postgresql`, `mongo`, `mariadb`, and `mysql`.

`filters?`: An option to filter Q&As. Excluding this option or leaving it empty will retreive all Q&As.