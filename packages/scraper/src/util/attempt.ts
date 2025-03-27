import type { Logger } from "pino";

export interface AttemptOptions<T> {
	callback: () => T | Promise<T>;
	onRetry?: (attempts: number) => void;
	logger?: Pick<Logger, "error">;
	attempts: number;
}

export interface AttemptSuccess<T> {
	status: "success";
	value: T;
}

export interface AttemptFailure {
	status: "failure";
}

export type AttemptResult<T> = AttemptSuccess<T> | AttemptFailure;

export const attempt = async <T>(
	options: AttemptOptions<T>,
): Promise<AttemptResult<T>> => {
	let result: T | undefined = undefined;

	for (let i = 0; i < options.attempts; i++) {
		try {
			result = await options.callback();
			return {
				status: "success",
				value: result,
			};
		} catch (e) {
			options.logger?.error(e);
			options.onRetry?.(i);
		}
	}

	return {
		status: "failure",
	};
};
