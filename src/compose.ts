import { Middleware, MiddlewarePayload, NextMiddleware } from './types';

import { assertMiddlewares } from './helpers';

export function compose<T>(middlewares: Middleware<T>[]): Middleware<T> {
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

export function composeWithPayload<T, P>(
	middlewares: MiddlewarePayload<T, P>[],
	next: (context: T, payload: P) => Promise<any>
) {
	assertMiddlewares(middlewares);

	return (context: T, payload: P) => {
		let lastIndex = -1;

		const nextDispatch = async (index: number) => {
			if (index <= lastIndex) {
				throw new Error('next() called multiple times');
			}

			lastIndex = index;

			const middleware = middlewares[index];

			if (!middleware) {
				await next(context, payload);

				return payload;
			}

			await middleware(context, (): Promise<P> => (
				nextDispatch(index + 1)
			));

			return payload;
		};

		return nextDispatch(0);
	};
}
