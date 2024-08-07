/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Okay because we only import a type.
import type { GotScraping, Response } from "got-scraping";
import { SessionPool } from "@crawlee/core";
import { Logger } from "pino";

export interface FetchOptions {
    /**
     * Optional logger to include
     */
    logger?: Logger;

    /**
     * If a session fails, retry once with a new session before giving up.
     */
    trySessionRefresh?: boolean;
}

type GotClientFetchResult = {
    response: Response<string>;
    badSession: boolean;
};

// from @crawlee/util
let gotScraping = (async (...args: Parameters<GotScraping>) => {
    ({ gotScraping } = await import("got-scraping"));
    return gotScraping(...args);
}) as GotScraping;

class GotScrapingClient {
    private sessionPool: SessionPool | null = null;

    private async getSessionPool(): Promise<SessionPool> {
        this.sessionPool ??= await SessionPool.open({
            maxPoolSize: 100,
            sessionOptions: {
                maxUsageCount: 5
            }
        });
        return this.sessionPool;
    }

    async fetch(url: string, options?: FetchOptions): Promise<Response<string>> {
        const logger = options?.logger?.child({ label: "gotScrapingClientFetch" });
        const pool = await this.getSessionPool();

        const getResponse = async (): Promise<GotClientFetchResult> => {
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

        const result = await getResponse();
        if (result.badSession && options?.trySessionRefresh) {
            logger?.info("Retrying request with new session.");
            const retryResult = await getResponse();
            return retryResult.response;
        }

        return result.response;
    }

    async ping(url: string, options?: FetchOptions): Promise<boolean> {
        const response = await this.fetch(url, options);
        return response.ok;
    }
}

let client: GotScrapingClient | null = null;

export const getScrapingClient = (): GotScrapingClient => {
    client ??= new GotScrapingClient();
    return client;
};
