import { describe, it } from 'node:test';
import { match, ok, deepStrictEqual, strictEqual } from 'node:assert';

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

        deepStrictEqual(out, [1, 2, 3, 4, 5, 6]);
    });

    it('should keep the context', async (): Promise<void> => {
        const context = {};

        const composer = new Composer();

        composer.use(async (ctx, next): Promise<void> => {
            await next();

            strictEqual(ctx, context);
        });

        composer.use(async (ctx, next): Promise<void> => {
            await next();

            strictEqual(ctx, context);
        });

        composer.use(async (ctx, next): Promise<void> => {
            await next();

            strictEqual(ctx, context);
        });

        const middleware = composer.compose();

        await middleware(context, noopNext);
    });

    it('should work with 0 middleware', async (): Promise<void> => {
        const middleware = (new Composer()).compose();

        await middleware({}, noopNext);
    });

    it('should reject on errors in middleware', async (): Promise<void> => {
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
            ok(error instanceof Error);

            return;
        }

        throw new Error();
    });

    it('should only accept middleware as functions', (): void => {
        try {
            // @ts-expect-error cause test
            (new Composer()).use(null);

            throw new Error('Middleware must be composed of functions');
        } catch (error) {
            ok(error instanceof TypeError);
        }
    });

    it('composer should be cloned', async (): Promise<void> => {
        type CloneContext = {
            baseValue?: boolean;
            value: 'first' | 'second' | 'default';
        }

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

        deepStrictEqual(baseContext, {
            baseValue: true,
            value: 'default',
        });

        deepStrictEqual(firstContext, {
            baseValue: true,
            value: 'first',
        });

        deepStrictEqual(secondContext, {
            baseValue: true,
            value: 'second',
        });
    });

    it('should correctly display the number of middleware', (): void => {
        const composer = new Composer();

        strictEqual(composer.length, 0);

        composer.tap(() => { });

        strictEqual(composer.length, 1);

        composer.tap(() => { });

        strictEqual(composer.length, 2);
    });

    it('should create new instance of the Composer class', (): void => {
        const composer = Composer.builder<{ test: 'test' }>();

        composer.use((context) => {
            if (context.test === 'test') {
                // ...
            }
        });

        strictEqual(composer.length, 1);
        ok(composer instanceof Composer);
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
            // @ts-expect-error cause test
        } catch ({ message }) {
            match(message, /multiple times/);

            return;
        }

        throw new Error('next() called multiple times');
    });
});
