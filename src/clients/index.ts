import { Logger } from "pino";
import { CycleTLSScrapingClient } from "./cycletls_client";
import { FetcherOptions } from "../modules";

export const getPreferredClient = async (logger?: Logger): Promise<CycleTLSScrapingClient> => {
    await CycleTLSScrapingClient.initialize(logger);
    return CycleTLSScrapingClient.getInstance();
};

export const getDefaultFetcherOptions = async (options?: FetcherOptions): Promise<Required<Omit<FetcherOptions, "logger">> & Pick<FetcherOptions, "logger">> => {
    const client = options?.client ?? (await getPreferredClient(options?.logger));
    const teardown = options?.teardown ?? true;
    return { client, teardown, logger: options?.logger };
};

export * from "./fetch_client";
export * from "./got_client";
export * from "./cycletls_client";
export * from "./curl_impersonate_client";
