import { Middleware, MiddlewarePayload } from './types';

import { assertMiddlewares, noopNext } from './helpers';

export function composeChain<T>(middlewares: Middleware<T>[]) {
	assertMiddlewares(middlewares);

	return (context: T) => {
		let lastIndex = -1;

		const nextDispatch = async (index: number) => {
			if (index <= lastIndex) {
				throw new Error('next() called multiple times');
			}

			lastIndex = index;

			const middleware = middlewares[index];

			if (!middleware) {
				return;
			}

			await middleware(context, () => (
				nextDispatch(index + 1)
			));
		};

		return nextDispatch(0);
	};
}

export function compose<T>(middlewares: Middleware<T>[], next: Middleware<T>) {
	return composeChain([
		...middlewares,
		next
	]);
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
