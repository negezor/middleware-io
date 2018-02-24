import { inspect } from 'util';

/**
 * Middleware stack
 *
 * @public
 */
export default class Middleware {
	/**
	 * Constructor
	 *
	 * @param {Array} middlewares
	 */
	constructor(...middlewares) {
		this.stack = [];

		this.use(middlewares);
	}

	/**
	 * Adds middlewares
	 *
	 * @param {Array} middlewares
	 *
	 * @return {this}
	 */
	use(...middlewares) {
		for (const middleware of middlewares) {
			if (Array.isArray(middleware)) {
				this.use(...middleware);

				continue;
			}

			if (typeof middleware !== 'function') {
				throw new TypeError('Middleware must be composed of functions!');
			}

			this.stack.push(middleware);
		}

		return this;
	}

	/**
	 * Launches the middleware chain
	 *
	 * @param {Array} args
	 *
	 * @return {Promise<boolean>}
	 */
	run(...args) {
		const { stack } = this;

		let index = -1;
		const status = {
			finished: true,
			contexts: args
		};

		const next = async (i) => {
			if (i <= index) {
				throw new Error('next() called multiple times');
			}

			index = i;

			if (!(i in stack)) {
				status.finished = true;

				return status;
			}

			await stack[i](...args, () => next(i + 1));

			status.finished = stack.length <= index;

			return status;
		};

		return next(0);
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?Number} depth
	 * @param {Object}  options
	 *
	 * @return {String}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} { ${inspect(this.stack, options)} }`;
	}
}
