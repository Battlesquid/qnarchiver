import { FetcherOptions } from "../modules/fetchers";
import { Logger } from "pino";
import { GotScrapingClient } from "./got_client";

export const getPreferredClient = async (logger?: Logger): Promise<GotScrapingClient> => {
    return new GotScrapingClient(logger, true);
};

export const getDefaultFetcherOptions = async (
    options?: FetcherOptions
): Promise<Required<Omit<FetcherOptions, "logger">> & Pick<FetcherOptions, "logger">> => {
    const client = options?.client ?? (await getPreferredClient(options?.logger));
    const teardown = options?.teardown ?? true;
    return { client, teardown, logger: options?.logger };
};
