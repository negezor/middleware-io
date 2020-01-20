import {
	Middleware,
	NextMiddleware,
	MiddlewareReturn,
	NextMiddlewareReturn
} from './types';

import { assertMiddlewares } from './helpers';

/**
 * Compose an array of middleware handlers into a single handler
 *
 * @param middlewares - The array of middleware
 *
 * @returns Composed middleware
 */
export function compose<T>(middlewares: Middleware<T>[]): Middleware<T> {
	assertMiddlewares(middlewares);

	if (middlewares.length === 0) {
		return (
			context: T,
			next: NextMiddleware
		): Promise<NextMiddlewareReturn> => Promise.resolve(next());
	}

	if (middlewares.length === 1) {
		const [middleware] = middlewares;

		return (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => (
			Promise.resolve(middleware(context, next))
		);
	}

	return (context: T, next: NextMiddleware): Promise<MiddlewareReturn> => {
		let lastIndex = -1;

		const nextDispatch = (index: number): Promise<NextMiddlewareReturn> => {
			if (index <= lastIndex) {
				return Promise.reject(new Error('next() called multiple times'));
			}

			lastIndex = index;

			const middleware = middlewares[index];

			if (!middleware) {
				return next();
			}

			try {
				return Promise.resolve(middleware(context, (): Promise<NextMiddlewareReturn> => (
					nextDispatch(index + 1)
				)));
			} catch (error) {
				return Promise.reject(error);
			}
		};

		return nextDispatch(0);
	};
}
