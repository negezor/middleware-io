import nodeUtil from 'util';

const { inspect } = nodeUtil;

/**
 * Middleware stack
 *
 * @public
 */
export default class Middleware {
	/**
	 * Constructor
	 *
	 * @param {Function[]} middlewares
	 */
	constructor(...middlewares) {
		this.stack = [];

		this.use(middlewares);
	}

	/**
	 * Adds middlewares
	 *
	 * @param {Function[]} middlewares
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
	 * @return {Promise<Object>}
	 */
	run(...args) {
		const { stack } = this;

		let index = -1;
		const status = {
			finished: false,
			contexts: args
		};

		const next = async (i) => {
			if (i <= index) {
				throw new Error('next() called multiple times');
			}

			index = i;

			const middleware = stack[i];

			if (!middleware) {
				status.finished = true;

				return status;
			}

			await middleware(...args, () => next(i + 1));

			return status;
		};

		return next(0);
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} { ${inspect(this.stack, options)} }`;
	}
}
