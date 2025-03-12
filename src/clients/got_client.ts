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

    async fetch(url: string): Promise<GotClientFetchResponse> {
        const logger = this.logger?.child({ label: "gotScrapingClientFetch" });
        const pool = await this.getSessionPool();

        const response = await this.getResponse(url, pool);
        if (response.badSession && this.doSessionRefresh) {
            logger?.info("Retrying request with new session.");
            const retry = await this.getResponse(url, pool);
            return {
                body: retry.response.body,
                status: retry.response.statusCode,
                ok: retry.response.ok,
                response: retry.response,
                url: retry.response.url
            };
        }

        return {
            body: response.response.body,
            status: response.response.statusCode,
            ok: response.response.ok,
            response: response.response,
            url: response.response.url
        };
    }

    async buffer(url: string, attempts = 0): Promise<ArrayBufferLike | null> {
        const pool = await this.getSessionPool();
        const { response, badSession } = await this.getResponse(url, pool);
        if (badSession && attempts === 0) {
            return this.buffer(url, attempts + 1);
        }
        return response.rawBody.buffer;
    }

    teardown(): Promise<void> | void {}

    private async getSessionPool(): Promise<SessionPool> {
        this.sessionPool ??= await SessionPool.open({
            maxPoolSize: 100,
            sessionOptions: {
                maxUsageCount: 5
            }
        });
        return this.sessionPool;
    }

    private async getResponse(url: string, pool: SessionPool, logger?: Logger): Promise<InternalGotClientFetchResponse> {
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
    }
}
