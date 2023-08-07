interface BaseQnaUrlParams {
    program: string;
    season: string;
}

interface QnaUrlIdParams extends BaseQnaUrlParams {
    id: number;
}

interface QnaUrlPageParams extends BaseQnaUrlParams {
    page: number;
}

export type QnaHomeUrl = `https://www.robotevents.com/${string}/${string}/QA`;
export type QnaPageUrl = `${QnaHomeUrl}?page=${string}`;
export type QnaIdUrl = `${QnaHomeUrl}/${string}`;

export const validateQnaUrl = (url: string): Record<string, string> => {
    const regex = /^https:\/\/www\.robotevents\.com\/(?<program>\w+)\/(?<season>\d{4}-\d{4})\/QA(?:\/(?<id>\d+))?(?:\?page=(?<page>\d+))?$/;
    const match = url.match(regex);
    if (!match?.groups) {
        throw Error(`${url} in unrecognized format.`);
    }
    return match.groups;
};

export const parseQnaUrlWithId = (url: QnaIdUrl): QnaUrlIdParams => {
    const parsed = validateQnaUrl(url);
    return {
        program: parsed.program,
        season: parsed.season,
        id: parseInt(parsed.id)
    };
};

export const parseQnaUrlWithPage = (url: QnaPageUrl): QnaUrlPageParams => {
    const parsed = validateQnaUrl(url);
    return {
        program: parsed.program,
        season: parsed.season,
        page: parseInt(parsed.page)
    };
};

export const buildHomeQnaUrl = (params: BaseQnaUrlParams): QnaHomeUrl => {
    const { program, season } = params;
    return `https://www.robotevents.com/${program}/${season}/QA`;
};

export const buildQnaUrlWithId = (params: QnaUrlIdParams): QnaIdUrl => {
    const { program, season, id } = params;
    return `https://www.robotevents.com/${program}/${season}/QA/${id}`;
};

export const buildQnaUrlWithPage = (params: QnaUrlPageParams): QnaPageUrl => {
    const { program, season, page } = params;
    return `https://www.robotevents.com/${program}/${season}/QA?page=${page}`;
};
