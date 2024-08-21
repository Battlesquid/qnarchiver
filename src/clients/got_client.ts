/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Okay because we only import a type.
import type { GotScraping, Response } from "got-scraping";
import { SessionPool } from "@crawlee/core";
import { FetchClient, FetchClientOptions, FetchClientResponse, FetchHtmlResponse } from ".";
import { unleak } from "../modules/extractors";
import { Logger } from "pino";

export type BaseGotClientFetchResponse = {
    response: Response<string>;
};

type InternalGotClientFetchResponse = BaseGotClientFetchResponse & {
    badSession: boolean;
};

export type GotClientFetchOptions = FetchClientOptions & {
    /**
     * If a session fails, retry once with a new session before giving up.
     */
    trySessionRefresh?: boolean;
};

export type GotClientFetchResponse = BaseGotClientFetchResponse & FetchClientResponse;

// from @crawlee/util
let gotScraping = (async (...args: Parameters<GotScraping>) => {
    ({ gotScraping } = await import("got-scraping"));
    return gotScraping(...args);
}) as GotScraping;

class GotScrapingClient implements FetchClient {
    private sessionPool: SessionPool | null = null;

    constructor(
        private logger?: Logger,
        private doSessionRefresh?: boolean
    ) {}

    private async getSessionPool(): Promise<SessionPool> {
        this.sessionPool ??= await SessionPool.open({
            maxPoolSize: 100,
            sessionOptions: {
                maxUsageCount: 5
            }
        });
        return this.sessionPool;
    }

    async fetch(url: string): Promise<GotClientFetchResponse> {
        const logger = this.logger?.child({ label: "gotScrapingClientFetch" });
        const pool = await this.getSessionPool();

        const getResponse = async (): Promise<InternalGotClientFetchResponse> => {
            const session = await pool.getSession();
            let response: Response<string>;
            try {
                response = await gotScraping(url, {
                    sessionToken: session,
                    useHeaderGenerator: true,
                    headerGeneratorOptions: {
                        browsersListQuery: "> 5%, not dead",
                        operatingSystems: ["windows", "linux"]
                    },
                    responseType: "text",
                    retry: {
                        limit: 3,
                        statusCodes: [403]
                    },
                    cookieJar: {
                        getCookieString: async (url: string) => session.getCookieString(url),
                        setCookie: async (rawCookie: string, url: string) => session.setCookie(rawCookie, url)
                    }
                });
            } catch (e) {
                logger?.trace(`Error fetching ${url}, marking session as bad`);
                session.markBad();
                throw e;
            }

            logger?.trace(`Got ${response.statusCode} on ${url}`);
            const hadBadStatus = session.retireOnBlockedStatusCodes(response.statusCode);
            if (hadBadStatus) {
                logger?.warn(`Warning: Bad status on ${url}, retiring`);
                return { response, badSession: true };
            } else {
                session.setCookiesFromResponse(response);
                return { response, badSession: false };
            }
        };

        const response = await getResponse();
        const {
            badSession,
            response: { body, statusCode: status, ok }
        } = response;
        if (badSession && this.doSessionRefresh) {
            logger?.info("Retrying request with new session.");
            const retryResponse = await getResponse();
            const {
                response: { body, statusCode: status, ok }
            } = retryResponse;
            return { body, status, ok, response: retryResponse.response };
        }
        return { body, status, ok, response: response.response };
    }

    async getHtml(url: string): Promise<FetchHtmlResponse | null> {
        this.logger?.trace(`Fetching HTML from ${url}.`);
        const client = getGotClient();
        const { response, status, ok } = await client.fetch(url);
        if (!ok) {
            this.logger?.trace(
                {
                    url,
                    status,
                    headers: response.request.options.headers
                },
                `Fetch for ${url} returned ${status}: ${status}`
            );
            return null;
        }
        return {
            url: response.url,
            html: unleak(response.body)
        };
    }

    async ping(url: string): Promise<boolean> {
        const response = await this.fetch(url);
        return response.ok;
    }
}

let client: GotScrapingClient | null = null;

export const getGotClient = (): GotScrapingClient => {
    client ??= new GotScrapingClient();
    return client;
};
