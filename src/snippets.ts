import { Middleware, NextMiddleware } from './types';
import { skipMiddleware, stopMiddleware } from './helpers';

export type BranchMiddlewareConditionFunction<T> = (context: T) => boolean;

export type BranchMiddlewareCondition<T> = BranchMiddlewareConditionFunction<T> | boolean;

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

export const getBeforeMiddleware = <T>(
	beforeMiddleware: Middleware<T>,
	middleware: Middleware<T>
) => (
	async (context: T, next: NextMiddleware) => {
		let called = false;

		await beforeMiddleware(context, async () => {
			called = true;
		});

		if (called) {
			await middleware(context, next);
		}
	}
);

export const getAfterMiddleware = <T>(
	middleware: Middleware<T>,
	afterMiddleware: Middleware<T>
) => (
	async (context: T, next: NextMiddleware) => {
		let called = false;

		await middleware(context, async () => {
			called = true;
		});

		if (called) {
			await afterMiddleware(context, next);
		}
	}
);
