import { Middleware, NextMiddleware } from './types';

import { assertMiddlewares } from './helpers';

/**
 * Compose an array of middleware handlers into a single handler
 *
 * @param middlewares - The array of middleware
 *
 * @returns Composed middleware
 */
export default function compose<T>(middlewares: Middleware<T>[]): Middleware<T> {
	assertMiddlewares(middlewares);

	return (context: T, next: NextMiddleware) => {
		let lastIndex = -1;

		const nextDispatch = (index: number): Promise<any> => {
			if (index <= lastIndex) {
				throw new Error('next() called multiple times');
			}

			lastIndex = index;

			const middleware = middlewares[index];

			if (!middleware) {
				return next();
			}

			try {
				return Promise.resolve(middleware(context, () => (
					nextDispatch(index + 1)
				)));
			} catch (error) {
				return Promise.reject(error);
			}
		};

		return nextDispatch(0);
	};
}
