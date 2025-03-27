// https://bugs.chromium.org/p/v8/issues/detail?id=2869
export const unleak = (str: string | undefined | null): string => {
	// biome-ignore lint: style/useTemplate
	return (" " + (str ?? "")).slice(1);
};
