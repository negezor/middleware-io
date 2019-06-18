import {
	Middleware,
	NextMiddleware,

	LazyMiddlewareFactory,
	BranchMiddlewareCondition
} from './types';

import { wrapMiddlewareNextCall } from './helpers';

/**
 * Noop for call `next()` in middleware
 */
export const noopNext: NextMiddleware = async () => {};

/**
 * Call `next()` in middleware
 */
export const skipMiddleware = <T>(context: T, next: NextMiddleware) => next();

/**
 * Does not call `next()` in middleware
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopMiddleware = <T>(context: T, next: NextMiddleware) => {};

/**
 * Lazily asynchronously gets middleware
 */
export const getLazyMiddleware = <T>(factory: LazyMiddlewareFactory<T>) => (
	async (context: T, next: NextMiddleware) => {
		const middleware = await factory(context);

		return middleware(context, next);
	}
);

/**
 * Runs the middleware and force call `next()`
 */
export const getTapMiddleware = <T>(middleware: Middleware<T>) => (
	async (context: T, next: NextMiddleware) => {
		await middleware(context, noopNext);

		return next();
	}
);

/**
 * Runs the middleware at the next event loop and force call `next()`
 */
export const getForkMiddleware = <T>(middleware: Middleware<T>) => (
	async (context: T, next: NextMiddleware) => {
		setImmediate(middleware, context, noopNext);

		return next();
	}
);

/**
 * By condition splits the middleware
 */
export const getBranchMiddleware = <T>(
	condition: BranchMiddlewareCondition<T>,

	trueMiddleware: Middleware<T>,
	falseMiddleware: Middleware<T>
) => {
	if (typeof condition !== 'function') {
		return condition
			? trueMiddleware
			: falseMiddleware;
	}

	return async (context: T, next: NextMiddleware) => (
		await condition(context)
			? trueMiddleware(context, next)
			: falseMiddleware(context, next)
	);
};

/**
 * Conditionally runs optional middleware or skips middleware
 */
export const getOptionalMiddleware = <T>(
	condition: BranchMiddlewareCondition<T>,
	optionalMiddleware: Middleware<T>
) => (
	getBranchMiddleware(
		condition,
		optionalMiddleware,
		skipMiddleware
	)
);

/**
 * Conditionally runs middleware or stops the chain
 */
export const getFilterMiddleware = <T>(
	condition: BranchMiddlewareCondition<T>,
	filterMiddleware: Middleware<T>
) => (
	getBranchMiddleware(
		condition,
		filterMiddleware,
		stopMiddleware
	)
);

/**
 * Runs the second middleware before the main
 */
export const getBeforeMiddleware = <T>(
	middleware: Middleware<T>,
	beforeMiddleware: Middleware<T>
) => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware) => {
		const called = await wrapMiddlewareNextCall(context, beforeMiddleware)

		if (called) {
			return middleware(context, next);
		}
	}
);

/**
 * Runs the second middleware after the main
 */
export const getAfterMiddleware = <T>(
	middleware: Middleware<T>,
	afterMiddleware: Middleware<T>
) => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware) => {
		const called = await wrapMiddlewareNextCall(context, middleware)

		if (called) {
			return afterMiddleware(context, next);
		}
	}
);

/**
 * Concurrently launches middleware,
 * the chain will continue if `next()` is called in all middlewares
 */
export const getConcurrencyMiddleware = <T>(...middlewares: Middleware<T>[]) => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware) => {
		const concurrencies = await Promise.all(middlewares.map(middleware => (
			wrapMiddlewareNextCall(context, middleware)
		)));

		if (concurrencies.every(Boolean)) {
			return next();
		}
	}
);
