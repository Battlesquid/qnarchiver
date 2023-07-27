export interface RetryOptions {
    callback: () => void | Promise<void>
    onRetry?: (attempts: number) => void
    onFail?: (error: unknown) => void
    logError?: boolean
    attempts: number
}

export default async (opts: RetryOptions) => {
    let attempts = 0;
    let attempting = true;

    while (attempting) {
        try {
            await opts.callback();
            attempting = false;
        } catch (e) {
            if (opts.logError) {
                console.error(e);
            }
            opts.onRetry?.(attempts);
            attempts++;
            if (attempts === opts.attempts) {
                attempting = false;
                opts.onFail?.(e);
            }
        }
    }
};
