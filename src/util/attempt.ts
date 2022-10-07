export interface RetryOptions {
    callback: () => unknown
    onRetry?: (attempts: number) => void
    onFail?: (attempts: number) => void
    logError?: boolean
    maxAttempts: number
}

export default (opts: RetryOptions) => {
    let attempts = 0;
    let attempting = true;

    while (attempting) {
        try {
            opts.callback();
            attempting = false;
        } catch (e) {
            if (opts.logError) {
                console.error(e);
            }
            if (opts.onRetry) {
                opts.onRetry(attempts);
            }
            attempts++;
            if (attempts === opts.maxAttempts) {
                attempting = false;
                if (opts.onFail) {
                    opts.onFail(attempts);
                }
            }
        }
    }
}