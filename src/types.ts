export interface ArchiverOptions {
    dir?: string,
    verbose?: boolean
}

export interface QnaQuestion {
    id: string,
    url: string,
    question: string,
    answer: string,
    season: string,
    title: string
}