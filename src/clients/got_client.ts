/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Okay because we only import a type.
import type { GotScraping, Response } from "got-scraping";
import { SessionPool } from "@crawlee/core";
import { FetchClient, FetchClientOptions, FetchClientResponse } from "./fetch_client";
import { Logger } from "pino";

export type BaseGotClientFetchResponse = {
    readonly response: Response<string>;
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

export class GotScrapingClient extends FetchClient<GotClientFetchResponse> {
    private sessionPool: SessionPool | null = null;

    constructor(
        logger?: Logger,
        private doSessionRefresh?: boolean
    ) {
        super(logger);
    }

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
            response: { body, statusCode: status, url: responseURL, ok }
        } = response;
        if (badSession && this.doSessionRefresh) {
            logger?.info("Retrying request with new session.");
            const retryResponse = await getResponse();
            const {
                response: { body, statusCode: status, url, ok }
            } = retryResponse;
            return { body, status, ok, response: retryResponse.response, url };
        }
        return { body, status, ok, response: response.response, url: responseURL };
    }

    teardown(): Promise<void> | void {}
}
