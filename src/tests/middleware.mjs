import { assert, expect } from 'chai';

import Middleware from '../middleware';

/**
 * Delay N-ms
 *
 * @param {Number} delayed
 *
 * @return {Promise}
 */
const delay = delayed => (
	new Promise(resolve => setTimeout(resolve, delayed))
);

describe('Caster Middleware', () => {
	it('should work', async () => {
		const middleware = new Middleware();

		const out = [];

		middleware.use(async (ctx, next) => {
			out.push(1);

			await delay(1);
			await next();
			await delay(1);

			out.push(6);
		});

		middleware.use(async (ctx, next) => {
			out.push(2);

			await delay(1);
			await next();
			await delay(1);

			out.push(5);
		});

		middleware.use(async (ctx, next) => {
			out.push(3);

			await delay(1);
			await next();
			await delay(1);

			out.push(4);
		});

		await middleware.run({});

		expect(out).to.eql([1, 2, 3, 4, 5, 6]);
	});

	it('should keep the context', async () => {
		const middleware = new Middleware();

		const context = {};

		middleware.use(async (ctx, next) => {
			await next();

			expect(ctx).to.equal(context);
		});

		middleware.use(async (ctx, next) => {
			await next();

			expect(ctx).to.equal(context);
		});

		middleware.use(async (ctx, next) => {
			await next();

			expect(ctx).to.equal(context);
		});

		await middleware.run(context);
	});

	it('should work with 0 middleware', async () => {
		const middleware = new Middleware();

		await middleware.run({});
	});

	it('should reject on errors in middleware', async () => {
		const middleware = new Middleware();

		middleware.use(async (ctx, next) => {
			ctx.now = Date.now();

			await next();
		});

		middleware.use(async () => {
			throw new Error();
		});

		try {
			await middleware.run({});
		} catch (error) {
			expect(error).to.be.instanceof(Error);

			return;
		}

		throw new Error();
	});

	it('should only accept middleware as functions', () => {
		const middleware = new Middleware();

		try {
			middleware.use(null);

			throw new Error('Middleware must be composed of functions');
		} catch (error) {
			expect(error).to.be.instanceof(TypeError);
		}
	});

	it('should throw if next() is called multiple times', async () => {
		const middleware = new Middleware();

		middleware.use(async (ctx, next) => {
			await next();
		});

		middleware.use(async (ctx, next) => {
			await next();
			await next();
		});

		middleware.use(async (ctx, next) => {
			await next();
		});

		try {
			await middleware.run({});
		} catch ({ message }) {
			expect(message).to.include('multiple times');

			return;
		}

		throw new Error('next() called multiple times');
	});
});
