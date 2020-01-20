import { NextMiddleware, Middleware } from './types';

export function assertMiddleware<T extends unknown>(
	middleware: unknown
): asserts middleware is Middleware<T> {
	if (typeof middleware !== 'function') {
		throw new TypeError('Middleware must be composed of function!');
	}
}

export function assertMiddlewares<T extends unknown>(
	middlewares: unknown[]
): asserts middlewares is Middleware<T>[] {
	middlewares.forEach(assertMiddleware);
}

export const wrapMiddlewareNextCall = async <T>(
	context: T,
	middleware: Middleware<T>
): Promise<boolean> => {
	let called = false;

	await middleware(context, async (): Promise<void> => {
		if (called) {
			throw new Error('next() called multiple times');
		}

		called = true;
	});

	return called;
};

/**
 * Noop for call `next()` in middleware
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noopNext: NextMiddleware = (): Promise<void> => Promise.resolve();
