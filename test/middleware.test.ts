import { compose, noopNext } from '..';

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

type Partial = {
	[key: string]: any;
};

describe('compose', () => {
	it('should work', async () => {
		const out: number[] = [];

		const middleware = compose([
			async (ctx, next) => {
				out.push(1);

				await delay(1);
				await next();
				await delay(1);

				out.push(6);
			},
			async (ctx, next) => {
				out.push(2);

				await delay(1);
				await next();
				await delay(1);

				out.push(5);
			},
			async (ctx, next) => {
				out.push(3);

				await delay(1);
				await next();
				await delay(1);

				out.push(4);
			}
		]);

		await middleware(out, noopNext);

		expect(out).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
	});

	it('should keep the context', async () => {
		const context = {};

		const middleware = compose([
			async (ctx, next) => {
				await next();

				expect(ctx).toBe(context);
			},
			async (ctx, next) => {
				await next();

				expect(ctx).toBe(context);
			},
			async (ctx, next) => {
				await next();

				expect(ctx).toBe(context);
			}
		]);

		await middleware(context, noopNext);
	});

	it('should work with 0 middleware', async () => {
		const middleware = compose([]);

		await middleware({}, noopNext);
	});

	it('should reject on errors in middleware', async () => {
		const middleware = compose<Partial>([
			async (ctx, next) => {
				ctx.now = Date.now();

				await next();
			},
			async () => {
				throw new Error();
			}
		]);

		try {
			await middleware({}, noopNext);
		} catch (error) {
			expect(error).toBeInstanceOf(Error);

			return;
		}

		throw new Error();
	});

	it('should only accept middleware as functions', () => {
		try {
			// @ts-ignore
			compose([null]);

			throw new Error('Middleware must be composed of functions');
		} catch (error) {
			expect(error).toBeInstanceOf(TypeError);
		}
	});

	it('should throw if next() is called multiple times', async () => {
		const middleware = compose([
			async (ctx, next) => {
				await next();
			},
			async (ctx, next) => {
				await next();
				await next();
			},
			async (ctx, next) => {
				await next();
			}
		]);

		try {
			await middleware({}, noopNext);
		} catch ({ message }) {
			expect(message).toEqual(
				expect.stringMatching('multiple times')
			);

			return;
		}

		throw new Error('next() called multiple times');
	});
});
