import { Logger } from "pino";

export interface RetryOptions {
    callback: () => void | Promise<void>;
    onRetry?: (attempts: number) => void;
    onFail?: (error: unknown) => void;
    logger?: Pick<Logger, "trace">;
    attempts: number;
}

export default async (opts: RetryOptions): Promise<void> => {
    let attempts = 0;
    let attempting = true;

    while (attempting) {
        try {
            await opts.callback();
            attempting = false;
        } catch (e) {
            opts.logger?.trace(e);
            opts.onRetry?.(attempts);
            attempts++;
            if (attempts === opts.attempts) {
                attempting = false;
                opts.onFail?.(e);
            }
        }
    }
};
