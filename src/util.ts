import { Logger } from "pino";

export interface RetryOptions<T> {
    callback: () => T | Promise<T>;
    onRetry?: (attempts: number) => void;
    logger?: Pick<Logger, "error">;
    attempts: number;
}

export const attempt = async <T>(opts: RetryOptions<T>): Promise<T | undefined> => {
    let result: T | undefined = undefined;

    for (let i = 0; i < opts.attempts; i++) {
        try {
            result = await opts.callback();
            return result;
        } catch (e) {
            opts.logger?.error(e);
            opts.onRetry?.(i);
            if (i === opts.attempts - 1) {
                throw e;
            }
        }
    }

    return result;
};

export const nsToMsElapsed = (start: bigint): number => {
    return nsToMs(process.hrtime.bigint() - start);
};

export const nsToMs = (ns: bigint): number => {
    return Number((Number(ns) / 1e6).toFixed(3));
};
