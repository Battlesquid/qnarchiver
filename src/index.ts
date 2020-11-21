import env from "dotenv";
env.config({ path: "../.env" });

import { archiveCategory } from "./modules/queryPages";

const categories: string[] = ["VRC", "VEXU", "VIQC", "VAIC-HS", "VAIC-U", "RADC", "Judging"];

(async () => {

    console.time("Archival Processing Time:");
    for (const category of categories) {
        console.log("===========", category, "===========")
        await archiveCategory(category);
    }
    console.timeEnd("Archival Processing Time:");
})()   