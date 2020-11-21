interface QnaQuestion {
    id: string,
    url: string,
    question: string,
    answer: string,
    season: string,
    title: string
}

export class Archiver {
    constructor(apiKey: string, dir?: string)
    processCategory(category: string, shouldReturn: boolean): Promise<QnaQuestion[] | undefined>
}

export function retreive(category: string): Promise<QnaQuestion[]> 