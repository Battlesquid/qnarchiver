import { Configuration, MikroORM } from "@mikro-orm/core";
import { createQnaUrls, SeasonFilters } from "..";
import { Question } from "../entities/Question";
import logger from "../util/logger";
import { scrapeQA } from "./scraper";

export type ArchiveOptions = {
    dbName: string
    dbType: keyof typeof Configuration.PLATFORMS
    filters?: SeasonFilters
}

export const archive = async (options: ArchiveOptions) => {
    const orm = await MikroORM.init({
        entities: [Question],
        dbName: options.dbName,
        type: options.dbType,
        debug: false
    })
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();

    const queryUrls = await createQnaUrls(options.filters);

    const questions = await scrapeQA(queryUrls)

    logger.verbose(`archive: Received ${questions.length} questions`)

    const entities = questions.map(q => orm.em.create(Question, q))

    try {
        await orm.em.persistAndFlush([...entities]);
    } catch (e) {
        logger.error("could not persist data")
        logger.error(e);
    }

    orm.close()
}
