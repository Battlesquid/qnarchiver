import { Logger } from "pino";

export interface FetchClientOptions {
    /**
     * Optional logger to include
     */
    logger?: Logger;
}

export type FetchClientResponse = {
    ok: boolean;
    status: number;
    body: string;
};

export type FetchHtmlResponse = {
    html: string;
    url: string;
};

export interface FetchClient<FetchResponse extends FetchClientResponse> {
    fetch(url: string): Promise<FetchResponse>;
    ping(url: string): Promise<boolean>;

    /**
     *
     * @param url The url to get
     * @param logger Optional {@link Logger}
     * @returns The html for the given url
     */
    getHtml(url: string): Promise<FetchHtmlResponse | null>;
}

export * from "./got_client";
