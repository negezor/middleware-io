import { inspect } from 'util';

import { MiddlewarePayload, MiddlewareStatusChain } from './types';

import { assertMiddlewares } from './helpers';
import { composeWithPayload } from './compose';

export default class MiddlewareStatus<T> {
	middlewares: MiddlewarePayload<T, MiddlewareStatusChain>[] = [];
	stack: Function = async () => ({
		finished: true
	})

	/**
	 * Constructor
	 */
	constructor(middlewares?: MiddlewarePayload<T, MiddlewareStatusChain>[]) {
		if (middlewares === undefined) {
			return;
		}

		this.use(middlewares);
	}

	/**
	 * Returns custom tag
	 */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Returns count middleware in chain
	 */
	get length(): number {
		return this.middlewares.length;
	}

	/**
	 * Adds middlewares
	 */
	use(
		middlewares: MiddlewarePayload<T, MiddlewareStatusChain>[] |
		MiddlewarePayload<T, MiddlewareStatusChain>
	): this {
		if (!Array.isArray(middlewares)) {
			middlewares = [middlewares];
		}

		assertMiddlewares(middlewares);

		this.middlewares.push(...middlewares);

		this.stack = composeWithPayload(
			this.middlewares,
			async (context, payload: MiddlewareStatusChain) => {
				payload.finished = true;
			}
		);

		return this;
	}

	/**
	 * Launches the middleware chain
	 */
	run(context: T): Promise<MiddlewareStatusChain> {
		return this.stack(context, {
			finished: false,
		});
	}

	/**
	 * Custom inspect object
	 */
	// tslint:disable-next-line:function-name
	[inspect.custom](depth: number, options: { stylize: Function }) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')}`
		+ `{ length: ${options.stylize(this.length, 'number')} }`;
	}
}
