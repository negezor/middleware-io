import { Middleware, LazyMiddlewareFactory, BranchMiddlewareCondition } from './types';

import compose from './compose';
import {
	getLazyMiddleware,
	getTapMiddleware,
	getForkMiddleware,
	getBranchMiddleware,
	getOptionalMiddleware,
	getFilterMiddleware,
	getBeforeMiddleware,
	getAfterMiddleware,
	getEnforceMiddleware,
	getConcurrencyMiddleware
} from './snippets';

/**
 * A simple middleware compose builder
 */
export default class Composer<T = object> {
	protected middlewares: Middleware<T>[] = [];

	/**
	 * Adds middleware to the chain
	 */
	public use(middleware: Middleware<T>): this {
		this.middlewares.push(middleware);

		return this;
	}

	/**
	 * Lazily asynchronously gets middleware
	 */
	public lazy(factory: LazyMiddlewareFactory<T>): this {
		return this.use(
			getLazyMiddleware<T>(
				factory
			)
		);
	}

	/**
	 * Runs the middleware and force call `next()`
	 */
	public tap(middleware: Middleware<T>): this {
		return this.use(
			getTapMiddleware<T>(
				middleware
			)
		);
	}

	/**
	 * Runs the middleware at the next event loop and force call `next()`
	 */
	public fork(middleware: Middleware<T>): this {
		return this.use(
			getForkMiddleware<T>(
				middleware
			)
		);
	}

	/**
	 * By condition splits the middleware
	 */
	public branch(
		condition: BranchMiddlewareCondition<T>,

		trueMiddleware: Middleware<T>,
		falseMiddleware: Middleware<T>
	): this {
		return this.use(
			getBranchMiddleware<T>(
				condition,

				trueMiddleware,
				falseMiddleware
			)
		);
	}

	/**
	 * Conditionally runs optional middleware or skips middleware
	 */
	public optional(
		condition: BranchMiddlewareCondition<T>,
		optionalMiddleware: Middleware<T>
	): this {
		return this.use(
			getOptionalMiddleware<T>(
				condition,
				optionalMiddleware
			)
		);
	}

	/**
	 * Conditionally runs middleware or stops the chain
	 */
	public filter(
		condition: BranchMiddlewareCondition<T>,
		filterMiddleware: Middleware<T>
	): this {
		return this.use(
			getFilterMiddleware<T>(
				condition,
				filterMiddleware
			)
		);
	}

	/**
	 * Runs the second middleware before the main
	 */
	public before(
		middleware: Middleware<T>,
		beforeMiddleware: Middleware<T>
	): this {
		return this.use(
			getBeforeMiddleware<T>(
				middleware,
				beforeMiddleware
			)
		);
	}

	/**
	 * Runs the second middleware after the main
	 */
	public after(
		middleware: Middleware<T>,
		afterMiddleware: Middleware<T>
	): this {
		return this.use(
			getAfterMiddleware<T>(
				middleware,
				afterMiddleware
			)
		);
	}

	/**
	 * Runs middleware before and after the main
	 */
	public enforce(
		middleware: Middleware<T>,
		beforeMiddleware: Middleware<T>,
		afterMiddleware: Middleware<T>
	): this {
		return this.use(
			getEnforceMiddleware<T>(
				middleware,
				beforeMiddleware,
				afterMiddleware
			)
		);
	}

	/**
	 * Concurrently launches middleware,
	 * the chain will continue if `next()` is called in all middlewares
	 */
	public concurrency(
		middlewares: Middleware<T>[]
	): this {
		return this.use(
			getConcurrencyMiddleware<T>(
				middlewares
			)
		);
	}

	/**
	 * Compose middleware handlers into a single handler
	 */
	public compose(): Middleware<T> {
		return compose([...this.middlewares]);
	}
}
