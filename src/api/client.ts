import { refresh } from 'src/api/mock';
import type { TokenData } from 'src/types';

let tokens: TokenData | null = null;
let isRefreshing = false;
let queue: Array<() => void> = [];

export const setTokens = (data: TokenData) => {
	tokens = data;
};

export const clearTokens = () => {
	tokens = null;
};

export const getAccessToken = () => tokens?.accessToken ?? null;

const processQueue = () => {
	queue.forEach((fn) => fn());
	queue = [];
};

const clearAndRedirect = () => {
	clearTokens();
	window.location.href = '/login';
};

export const apiClient = async <T>(call: (token: string | null) => Promise<T>): Promise<T> => {
	try {
		return await call(getAccessToken());
	} catch (error: unknown) {
		const apiError = error as { status: number };
		if (apiError.status !== 401) throw error;
		if (isRefreshing) {
			return new Promise<T>((resolve, reject) => {
				queue.push(() => {
					call(getAccessToken())
						.then(resolve)
						.catch(reject);
				});
			});
		}
		isRefreshing = true;
		try {
			const sessionToken = tokens?.sessionToken;
			const refreshed = await refresh(sessionToken);
			tokens = { ...tokens!, ...refreshed };
			processQueue();
			return await call(getAccessToken());
		} catch {
			clearAndRedirect();
			throw error;
		} finally {
			isRefreshing = false;
		}
	}
};

export const wrapWithClient = <TArgs extends unknown[], TReturn>(
	fn: (...args: TArgs) => Promise<TReturn>,
) => {
	return (...args: TArgs): Promise<TReturn> => apiClient(() => fn(...args));
};
