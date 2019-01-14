import { MiddlewareStatus } from '..';

/**
 * Delay N-ms
 *
 * @param {Number} delayed
 *
 * @return {Promise}
 */
const delay = (delayed: number) => (
	new Promise(resolve => setTimeout(resolve, delayed))
);

type KeyValueContext = {
	[key: string]: any;
};

describe('Middleware', () => {
	it('should work', async () => {
		const middleware = new MiddlewareStatus();

		const out: number[] = [];

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

		expect(out).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
	});

	it('should keep the context', async () => {
		const middleware = new MiddlewareStatus();

		const context = {};

		middleware.use(async (ctx, next) => {
			await next();

			expect(ctx).toBe(context);
		});

		middleware.use(async (ctx, next) => {
			await next();

			expect(ctx).toBe(context);
		});

		middleware.use(async (ctx, next) => {
			await next();

			expect(ctx).toBe(context);
		});

		await middleware.run(context);
	});

	it('should work with 0 middleware', async () => {
		const middleware = new MiddlewareStatus();

		await middleware.run({});
	});

	it('should be false if middleware is not executed before the end', async () => {
		const middleware = new MiddlewareStatus();

		middleware.use(async (ctx, next) => {});

		const { finished } = await middleware.run({});

		expect(finished).toEqual(false);
	});

	it('should be true if middleware is executed before the end', async () => {
		const middleware = new MiddlewareStatus();

		middleware.use(async (ctx, next) => {
			const { finished } = await next();

			expect(finished).toEqual(true);
		});

		const { finished } = await middleware.run({});

		expect(finished).toEqual(true);
	});

	it('should reject on errors in middleware', async () => {
		const middleware = new MiddlewareStatus<KeyValueContext>();

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
			expect(error).toBeInstanceOf(Error);

			return;
		}

		throw new Error();
	});

	it('should only accept middleware as functions', () => {
		const middleware = new MiddlewareStatus();

		try {
			// @ts-ignore
			middleware.use(null);

			throw new Error('Middleware must be composed of functions');
		} catch (error) {
			expect(error).toBeInstanceOf(TypeError);
		}
	});

	it('should throw if next() is called multiple times', async () => {
		const middleware = new MiddlewareStatus();

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
			expect(message).toEqual(
				expect.stringMatching('multiple times')
			);

			return;
		}

		throw new Error('next() called multiple times');
	});
});
