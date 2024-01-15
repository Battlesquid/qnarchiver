export const nsToMsElapsed = (start: bigint): number => {
    return nsToMs(process.hrtime.bigint() - start);
};

export const nsToMs = (ns: bigint): number => {
    return Number((Number(ns) / 1e6).toFixed(3));
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
