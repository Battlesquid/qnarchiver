import { Configuration, MikroORM } from "@mikro-orm/core";
import { SeasonFilters } from "..";
import { Question } from "../entities/Question";
import logger from "../util/logger";
import { getQuestions } from "./query";

export type ArchiveOptions = {
    dbName: string
    dbType: keyof typeof Configuration.PLATFORMS
    filters?: SeasonFilters
}

export const archive = async (options: ArchiveOptions, silent = true) => {
    logger.transports.forEach(t => t.silent = silent);

    const orm = await MikroORM.init({
        entities: [Question],
        dbName: options.dbName,
        type: options.dbType,
        debug: false
    })
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    
    const questions = await getQuestions(options.filters)

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
