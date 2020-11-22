import { ArchiverOptions, QnaQuestion } from "./types"

export class Archiver {
    constructor(apiKey: string, options: ArchiverOptions)
    processCategory(category: string, shouldReturn: boolean): Promise<QnaQuestion[] | undefined>
}