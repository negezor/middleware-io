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
	assertMiddlewares<T>(middlewares);

	return (context: T, next?: NextMiddleware): Promise<MiddlewareReturn> => {
		let lastIndex = -1;

		const nextDispatch = (index: number): Promise<NextMiddlewareReturn> => {
			if (index <= lastIndex) {
				return Promise.reject(new Error('next() called multiple times'));
			}

			lastIndex = index;

			const middleware = middlewares.length !== index
				? middlewares[index]
				: next;

			if (!middleware) {
				return Promise.resolve();
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
