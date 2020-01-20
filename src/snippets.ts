import {
	Middleware,
	NextMiddleware,
	MiddlewareReturn,
	NextMiddlewareReturn,

	LazyMiddlewareFactory,
	BranchMiddlewareCondition,
	CaughtMiddlewareHandler
} from './types';

import { wrapMiddlewareNextCall, noopNext } from './helpers';

/**
 * Call `next()` in middleware
 */
export const skipMiddleware = <T>(
	context: T,
	next: NextMiddleware
): Promise<MiddlewareReturn> => next();

/**
 * Does not call `next()` in middleware
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stopMiddleware = <T>(context: T, next: NextMiddleware): Promise<void> => (
	Promise.resolve()
);

/**
 * Lazily asynchronously gets middleware
 *
 * Example:
 *
 * ```ts
 * getLazyMiddleware(async (context) => {
 *   const route = await getSomeRoute(context.path) // Promise<Function>;
 *
 *   return route;
 * });
 * ```
 */
export const getLazyMiddleware = <T>(factory: LazyMiddlewareFactory<T>): Middleware<T> => {
	let middleware: Middleware<T> | undefined;

	return async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		if (middleware === undefined) {
			middleware = await factory(context);
		}

		return middleware(context, next);
	};
};

/**
 * Runs the middleware and force call `next()`
 *
 * Example:
 *
 * ```ts
 * getTapMiddleware((context) => {
 *   console.log('Context', context);
 * });
 * ```
 */
export const getTapMiddleware = <T>(middleware: Middleware<T>): Middleware<T> => (
	async (context: T, next: NextMiddleware): Promise<NextMiddlewareReturn> => {
		await middleware(context, noopNext);

		return next();
	}
);

/**
 * Runs the middleware at the next event loop and force call `next()`
 *
 * Example:
 *
 * ```ts
 * getForkMiddleware((context) => {
 *   statisticsMiddlewares(context).catch(console.error);
 * });
 * ```
 */
export const getForkMiddleware = <T>(middleware: Middleware<T>): Middleware<T> => (
	(context: T, next: NextMiddleware): Promise<NextMiddlewareReturn> => {
		setImmediate(middleware, context, noopNext);

		return next();
	}
);

/**
 * By condition splits the middleware
 *
 * Example:
 *
 * ```ts
 * getBranchMiddleware(
 *   async context => context.is('Content-Type', 'json'),
 *   myBodyParser.json(),
 *   myBodyParser.urlencoded()
 * );
 * ```
 *
 * Static condition
 *
 * ```ts
 * getBranchMiddleware(
 *   process.env.NODE_ENV === 'production',
 *   logger.loggedContextToFile(),
 *   logger.loggedContextToConsole()
 * );
 * ```
 */
export const getBranchMiddleware = <T>(
	condition: BranchMiddlewareCondition<T>,

	trueMiddleware: Middleware<T>,
	falseMiddleware: Middleware<T>
): Middleware<T> => {
	if (typeof condition !== 'function') {
		return condition
			? trueMiddleware
			: falseMiddleware;
	}

	return async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => (
		await condition(context)
			? trueMiddleware(context, next)
			: falseMiddleware(context, next)
	);
};

/**
 * Conditionally runs optional middleware or skips middleware
 *
 * Example:
 *
 * ```ts
 * getOptionalMiddleware(
 *   context => context.user.isAdmin,
 *   addFieldsForAdmin
 * );
 * ```
 */
export const getOptionalMiddleware = <T>(
	condition: BranchMiddlewareCondition<T>,
	optionalMiddleware: Middleware<T>
): Middleware<T> => (
	getBranchMiddleware(
		condition,
		optionalMiddleware,
		skipMiddleware
	)
);

/**
 * Conditionally runs middleware or stops the chain
 *
 * Example:
 *
 * ```ts
 * getFilterMiddleware(
 *   context => context.authorized,
 *   middlewareForAuthorized
 * );
 * ```
 */
export const getFilterMiddleware = <T>(
	condition: BranchMiddlewareCondition<T>,
	filterMiddleware: Middleware<T>
): Middleware<T> => (
	getBranchMiddleware(
		condition,
		filterMiddleware,
		stopMiddleware
	)
);

/**
 * Runs the second middleware before the main
 *
 * Example:
 *
 * ```ts
 * getBeforeMiddleware(
 *   myMockMiddleware,
 *   ouputUserData
 * );
 * ```
 */
export const getBeforeMiddleware = <T>(
	beforeMiddleware: Middleware<T>,
	middleware: Middleware<T>
): Middleware<T> => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		const called = await wrapMiddlewareNextCall(context, beforeMiddleware);

		if (called) {
			return middleware(context, next);
		}
	}
);

/**
 * Runs the second middleware after the main
 *
 * Example:
 *
 * ```ts
 * getAfterMiddleware(
 *   sendSecureData,
 *   clearSecurityData
 * );
 * ```
 */
export const getAfterMiddleware = <T>(
	middleware: Middleware<T>,
	afterMiddleware: Middleware<T>
): Middleware<T> => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		const called = await wrapMiddlewareNextCall(context, middleware);

		if (called) {
			return afterMiddleware(context, next);
		}
	}
);

/**
 * Runs middleware before and after the main
 *
 * Example:
 *
 * ```ts
 * getEnforceMiddleware(
 *   prepareData,
 *   sendData,
 *   clearData
 * );
 */
export const getEnforceMiddleware = <T>(
	beforeMiddleware: Middleware<T>,
	middleware: Middleware<T>,
	afterMiddleware: Middleware<T>
): Middleware<T> => (
	async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		const beforeCalled = await wrapMiddlewareNextCall(context, beforeMiddleware);

		if (!beforeCalled) {
			return;
		}

		const middlewareCalled = await wrapMiddlewareNextCall(context, middleware);

		if (!middlewareCalled) {
			return;
		}

		// eslint-disable-next-line consistent-return
		return afterMiddleware(context, next);
	}
);

/**
 * Catches errors in the middleware chain
 *
 * Example:
 * ```js
 * getCaughtMiddleware((context, error) => {
 *   if (error instanceof NetworkError) {
 *     return context.send('Sorry, network issues 😔');
 *   }
 *
 *   throw error;
 * })
 * ```
 *
 * Without a snippet, it would look like this:
 *
 * ```js
 * async (context, next) => {
 *   try {
 *     await next();
 *   } catch (error) {
 *     if (error instanceof NetworkError) {
 *       return context.send('Sorry, network issues 😔');
 *     }
 *
 *     throw error;
 *   }
 * };
 * ```
 */
export const getCaughtMiddleware = <T>(
	errorHandler: CaughtMiddlewareHandler<T>
): Middleware<T> => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		try {
			await next();
		} catch (error) {
			return errorHandler(context, error);
		}
	}
);

/**
 * Concurrently launches middleware,
 * the chain will continue if `next()` is called in all middlewares
 *
 * **Warning: Error interrupts all others**
 *
 * Example:
 *
 * ```ts
 * getConcurrencyMiddleware(
 *   initializeUser,
 *   initializeSession,
 *   initializeDatabase
 * );
 * ```
 */
export const getConcurrencyMiddleware = <T>(middlewares: Middleware<T>[]): Middleware<T> => (
	// eslint-disable-next-line consistent-return
	async (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		const concurrencies = await Promise.all(middlewares.map((middleware): Promise<boolean> => (
			wrapMiddlewareNextCall(context, middleware)
		)));

		if (concurrencies.every(Boolean)) {
			return next();
		}
	}
);
