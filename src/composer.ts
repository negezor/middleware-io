import {
	Middleware,

	LazyMiddlewareFactory,
	BranchMiddlewareCondition,
	CaughtMiddlewareHandler
} from './types';

import { compose } from './compose';
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
	getCaughtMiddleware,
	getConcurrencyMiddleware
} from './snippets';

import { assertMiddleware } from './helpers';

/**
 * A simple middleware compose builder
 */
export class Composer<T extends object> {
	protected middlewares: Middleware<T>[] = [];

	/**
	 * Invokes a new instance of the Composer class
	 */
	public static builder<Context extends object>(): Composer<Context> {
		return new Composer<Context>();
	}

	/**
	 * The number of middleware installed in Composer
	 */
	public get length(): number {
		return this.middlewares.length;
	}

	/**
	 * Clones a composer object
	 */
	public clone(): Composer<T> {
		const composer = new Composer<T>();

		composer.middlewares = [...this.middlewares];

		return composer;
	}

	/**
	 * Adds middleware to the chain
	 */
	public use(middleware: Middleware<T>): this {
		assertMiddleware(middleware);

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
		beforeMiddleware: Middleware<T>,
		middleware: Middleware<T>
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
		beforeMiddleware: Middleware<T>,
		middleware: Middleware<T>,
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
	 * Catches errors in the middleware chain
	 */
	public caught(errorHandler: CaughtMiddlewareHandler<T>): this {
		return this.use(
			getCaughtMiddleware<T>(
				errorHandler
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
