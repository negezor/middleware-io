import { Composer, noopNext } from '..';

/**
 * Delay N-ms
 *
 * @param {Number} delayed
 *
 * @return {Promise}
 */
const delay = (delayed: number): Promise<void> => (
	new Promise((resolve): void => {
		setTimeout(resolve, delayed);
	})
);

describe('Composer', (): void => {
	it('should work', async (): Promise<void> => {
		const out: number[] = [];

		const composer = new Composer();

		composer.use(async (ctx, next): Promise<void> => {
			out.push(1);

			await delay(1);
			await next();
			await delay(1);

			out.push(6);
		});

		composer.use(async (ctx, next): Promise<void> => {
			out.push(2);

			await delay(1);
			await next();
			await delay(1);

			out.push(5);
		});

		composer.use(async (ctx, next): Promise<void> => {
			out.push(3);

			await delay(1);
			await next();
			await delay(1);

			out.push(4);
		});

		const middleware = composer.compose();

		await middleware({}, noopNext);

		expect(out).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
	});

	it('should keep the context', async (): Promise<void> => {
		const context = {};

		const composer = new Composer();

		composer.use(async (ctx, next): Promise<void> => {
			await next();

			expect(ctx).toBe(context);
		});

		composer.use(async (ctx, next): Promise<void> => {
			await next();

			expect(ctx).toBe(context);
		});

		composer.use(async (ctx, next): Promise<void> => {
			await next();

			expect(ctx).toBe(context);
		});

		const middleware = composer.compose();

		await middleware(context, noopNext);
	});

	it('should work with 0 middleware', async (): Promise<void> => {
		const middleware = (new Composer()).compose();

		await middleware({}, noopNext);
	});

	it('should reject on errors in middleware', async (): Promise<void> => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const composer = new Composer<Record<string, any>>();

		composer.use(async (ctx, next): Promise<void> => {
			ctx.now = Date.now();

			await next();
		});

		composer.use(async (): Promise<never> => {
			throw new Error();
		});

		const middleware = composer.compose();

		try {
			await middleware({}, noopNext);
		} catch (error) {
			expect(error).toBeInstanceOf(Error);

			return;
		}

		throw new Error();
	});

	it('should only accept middleware as functions', (): void => {
		try {
			// @ts-ignore
			(new Composer()).use(null);

			throw new Error('Middleware must be composed of functions');
		} catch (error) {
			expect(error).toBeInstanceOf(TypeError);
		}
	});

	it('composer should be cloned', async (): Promise<void> => {
		type CloneContext = {
			baseValue?: boolean;
			value: 'first' | 'second' | 'default';
		};

		const baseComposer = new Composer<CloneContext>();

		baseComposer.use((context, next) => {
			context.baseValue = true;

			return next();
		});

		const firstComposer = baseComposer.clone()
			.use((context, next) => {
				context.value = 'first';

				return next();
			});

		const secondComposer = baseComposer.clone()
			.use((context, next) => {
				context.value = 'second';

				return next();
			});

		const baseContext = { value: 'default' } as CloneContext;
		const firstContext = { value: 'default' } as CloneContext;
		const secondContext = { value: 'default' } as CloneContext;

		await baseComposer.compose()(baseContext, noopNext);
		await firstComposer.compose()(firstContext, noopNext);
		await secondComposer.compose()(secondContext, noopNext);

		expect(baseContext).toMatchObject({
			baseValue: true,
			value: 'default'
		});

		expect(firstContext).toMatchObject({
			baseValue: true,
			value: 'first'
		});

		expect(secondContext).toMatchObject({
			baseValue: true,
			value: 'second'
		});
	});

	it('should correctly display the number of middleware', (): void => {
		const composer = new Composer();

		expect(composer.length).toEqual(0);

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		composer.tap(() => {});

		expect(composer.length).toEqual(1);

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		composer.tap(() => {});

		expect(composer.length).toEqual(2);
	});

	it('should create new instance of the Composer class', (): void => {
		const composer = Composer.builder<{ test: 'test' }>();

		composer.use((context) => {
			if (context.test === 'test') {
				// ...
			}
		});

		expect(composer.length).toEqual(1);
		expect(composer).toBeInstanceOf(Composer);
	});

	it('should throw if next() is called multiple times', async (): Promise<void> => {
		const composer = new Composer();

		composer.use(async (ctx, next): Promise<void> => {
			await next();
		});

		composer.use(async (ctx, next): Promise<void> => {
			await next();
			await next();
		});

		composer.use(async (ctx, next): Promise<void> => {
			await next();
		});

		const middleware = composer.compose();

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
