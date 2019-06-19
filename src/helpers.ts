import { NextMiddleware } from './types';

export const assertMiddleware = (middleware: Function): void => {
	if (typeof middleware !== 'function') {
		throw new TypeError('Middleware must be composed of function!');
	}
};

export const assertMiddlewares = (middlewares: Function[]): void => (
	middlewares.forEach(assertMiddleware)
);

export const wrapMiddlewareNextCall = async <T>(
	context: T,
	middleware: Function
): Promise<boolean> => {
	let called = false;

	await middleware(context, (): void => {
		called = true;
	});

	return called;
};

/**
 * Noop for call `next()` in middleware
 */
export const noopNext: NextMiddleware = async (): Promise<void> => {};
