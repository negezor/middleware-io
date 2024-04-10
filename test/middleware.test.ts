import { describe, it } from 'node:test';
import { deepStrictEqual, match, ok, strictEqual } from 'node:assert';

import { compose, noopNext } from '..';

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

describe('compose', (): void => {
    it('should work', async (): Promise<void> => {
        const out: number[] = [];

        const middleware = compose([
            async (ctx, next): Promise<void> => {
                out.push(1);

                await delay(1);
                await next();
                await delay(1);

                out.push(6);
            },
            async (ctx, next): Promise<void> => {
                out.push(2);

                await delay(1);
                await next();
                await delay(1);

                out.push(5);
            },
            async (ctx, next): Promise<void> => {
                out.push(3);

                await delay(1);
                await next();
                await delay(1);

                out.push(4);
            },
        ]);

        await middleware(out, noopNext);

        deepStrictEqual(out, [1, 2, 3, 4, 5, 6]);
    });

    it('should keep the context', async (): Promise<void> => {
        const context = {};

        const middleware = compose([
            async (ctx, next): Promise<void> => {
                await next();

                strictEqual(ctx, context);
            },
            async (ctx, next): Promise<void> => {
                await next();

                strictEqual(ctx, context);
            },
            async (ctx, next): Promise<void> => {
                await next();

                strictEqual(ctx, context);
            },
        ]);

        await middleware(context, noopNext);
    });

    it('should work with 0 middleware', async (): Promise<void> => {
        const middleware = compose([]);

        await middleware({}, noopNext);
    });

    it('should reject on errors in middleware', async (): Promise<void> => {
        const middleware = compose<Record<string, any>>([
            async (ctx, next): Promise<void> => {
                ctx.now = Date.now();

                await next();
            },
            async (): Promise<never> => {
                throw new Error();
            },
        ]);

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
            compose([null]);

            throw new Error('Middleware must be composed of functions');
        } catch (error) {
            ok(error instanceof TypeError);
        }
    });

    it('should throw if next() is called multiple times', async (): Promise<void> => {
        const middleware = compose([
            async (ctx, next): Promise<void> => {
                await next();
            },
            async (ctx, next): Promise<void> => {
                await next();
                await next();
            },
            async (ctx, next): Promise<void> => {
                await next();
            },
        ]);

        try {
            await middleware({}, noopNext);
            // @ts-expect-error cause error
        } catch ({ message }) {
            match(message, /multiple times/);

            return;
        }

        throw new Error('next() called multiple times');
    });
});
