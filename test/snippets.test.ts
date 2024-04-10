import { describe, it, mock } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert';

import {
    Middleware,
    NextMiddleware,

    noopNext,
    getLazyMiddleware,
    getTapMiddleware,
    getForkMiddleware,
    getBranchMiddleware,
    getOptionalMiddleware,
    getBeforeMiddleware,
    getAfterMiddleware,
    getEnforceMiddleware,
    getConcurrencyMiddleware,
    getFilterMiddleware,
    getCaughtMiddleware,
} from '..';

const makeContext = (): { shouldTrue: boolean; shouldFalse: boolean } => ({
    shouldTrue: true,
    shouldFalse: false,
});

type ContextType = ReturnType<typeof makeContext>;

describe('Snippets', (): void => {
    describe('getLazyMiddleware', (): void => {
        it('should work with function', async (): Promise<void> => {
            const lazyContext = makeContext();

            const nextMock = mock.fn(noopNext);
            const middlewareMock = mock.fn(
                (factoryContext: ContextType): Middleware<ContextType> => {
                    strictEqual(factoryContext, lazyContext);

                    return async (context: ContextType, next: NextMiddleware): Promise<void> => {
                        strictEqual(context, lazyContext);

                        await next();
                    };
                },
            );

            const lazyMiddleware = getLazyMiddleware(middlewareMock);

            await lazyMiddleware(lazyContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });

        it('should factory be called once', async (): Promise<void> => {
            const lazyContext = makeContext();

            const nextMock = mock.fn(noopNext);
            const middlewareMock = mock.fn(
                (factoryContext: ContextType): Middleware<ContextType> => {
                    ok(factoryContext === lazyContext);

                    return async (context: ContextType, next: NextMiddleware): Promise<void> => {
                        ok(context === lazyContext);

                        await next();
                    };
                },
            );

            const lazyMiddleware = getLazyMiddleware(middlewareMock);

            const CALLED_TIMES = 10;
            for (let i = 0; i < CALLED_TIMES; i += 1) {
                await lazyMiddleware(lazyContext, nextMock);
            }

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), CALLED_TIMES);
        });
    });

    describe('getTapMiddleware', (): void => {
        it('should runs with force next()', async (): Promise<void> => {
            const tapContext = makeContext();

            const nextMock = mock.fn(noopNext);
            const middlewareMock = mock.fn(
                async (context: ContextType): Promise<void> => {
                    ok(context === tapContext);
                },
            );

            const tapMiddleware = getTapMiddleware(middlewareMock);

            await tapMiddleware(tapContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });

    describe('getForkMiddleware', (): void => {
        it('should runs with force next()', async (): Promise<void> => {
            const forkContext = makeContext();

            const nextMock = mock.fn(noopNext);
            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === forkContext);

                    await next();
                },
            );

            const forkMiddleware = getForkMiddleware(middlewareMock);

            await forkMiddleware(forkContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 0);
            strictEqual(nextMock.mock.callCount(), 1);

            await new Promise((resolve: Function): void => {
                setImmediate((): void => {
                    strictEqual(middlewareMock.mock.callCount(), 1);

                    resolve();
                });
            });
        });
    });

    describe('getBranchMiddleware', (): void => {
        it('should runs with static condition', async (): Promise<void> => {
            const branchContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const trueMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === branchContext);

                    await next();
                },
            );

            const falseMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === branchContext);

                    await next();
                },
            );

            const trueMiddleware = getBranchMiddleware(
                true,
                trueMiddlewareMock,
                falseMiddlewareMock,
            );

            const falseMiddleware = getBranchMiddleware(
                false,
                trueMiddlewareMock,
                falseMiddlewareMock,
            );

            await trueMiddleware(branchContext, nextMock);
            await falseMiddleware(branchContext, nextMock);

            strictEqual(trueMiddlewareMock.mock.callCount(), 1);
            strictEqual(falseMiddlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 2);
        });

        it('should runs with dynamic condition', async (): Promise<void> => {
            const branchContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const trueMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === branchContext);

                    await next();
                },
            );

            const falseMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === branchContext);

                    await next();
                },
            );

            const trueMiddleware = getBranchMiddleware(
                mock.fn(() => true),
                trueMiddlewareMock,
                falseMiddlewareMock,
            );

            const falseMiddleware = getBranchMiddleware(
                mock.fn(() => false),
                trueMiddlewareMock,
                falseMiddlewareMock,
            );

            await trueMiddleware(branchContext, nextMock);
            await falseMiddleware(branchContext, nextMock);

            strictEqual(trueMiddlewareMock.mock.callCount(), 1);
            strictEqual(falseMiddlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 2);
        });
    });

    describe('getOptionalMiddleware', (): void => {
        it('should runs with static condition', async (): Promise<void> => {
            const optionalContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === optionalContext);

                    await next();
                },
            );

            const trueMiddleware = getOptionalMiddleware(
                true,
                middlewareMock,
            );

            const falseMiddleware = getOptionalMiddleware(
                false,
                middlewareMock,
            );

            await trueMiddleware(optionalContext, nextMock);
            await falseMiddleware(optionalContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 2);
        });

        it('should runs with dynamic condition', async (): Promise<void> => {
            const optionalContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === optionalContext);

                    await next();
                },
            );

            const trueMiddleware = getOptionalMiddleware(
                mock.fn(() => true),
                middlewareMock,
            );

            const falseMiddleware = getOptionalMiddleware(
                mock.fn(() => false),
                middlewareMock,
            );

            await trueMiddleware(optionalContext, nextMock);
            await falseMiddleware(optionalContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 2);
        });
    });

    describe('getFilterMiddleware', (): void => {
        it('should runs with static condition', async (): Promise<void> => {
            const filterContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === filterContext);

                    await next();
                },
            );

            const trueMiddleware = getFilterMiddleware(
                true,
                middlewareMock,
            );

            const falseMiddleware = getFilterMiddleware(
                false,
                middlewareMock,
            );

            await trueMiddleware(filterContext, nextMock);
            await falseMiddleware(filterContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });

        it('should runs with dynamic condition', async (): Promise<void> => {
            const filterContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === filterContext);

                    await next();
                },
            );

            const trueMiddleware = getFilterMiddleware(
                mock.fn(() => true),
                middlewareMock,
            );

            const falseMiddleware = getFilterMiddleware(
                mock.fn(() => false),
                middlewareMock,
            );

            await trueMiddleware(filterContext, nextMock);
            await falseMiddleware(filterContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });

    describe('getBeforeMiddleware', (): void => {
        it('should runs before middleware', async (): Promise<void> => {
            const beforeContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const beforeMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === beforeContext);

                    strictEqual(middlewareMock.mock.callCount(), 0);

                    await next();
                },
            );

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === beforeContext);

                    strictEqual(beforeMiddlewareMock.mock.callCount(), 1);

                    await next();
                },
            );

            const beforeMiddleware = getBeforeMiddleware(
                beforeMiddlewareMock,
                middlewareMock,
            );

            await beforeMiddleware(beforeContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });

    describe('getAfterMiddleware', (): void => {
        it('should runs after middleware', async (): Promise<void> => {
            const afterContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === afterContext);
                    strictEqual(afterMiddlewareMock.mock.callCount(), 0);

                    await next();
                },
            );

            const afterMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === afterContext);
                    strictEqual(middlewareMock.mock.callCount(), 1);

                    await next();
                },
            );

            const afterMiddleware = getAfterMiddleware(
                middlewareMock,
                afterMiddlewareMock,
            );

            await afterMiddleware(afterContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });

    describe('getEnforceMiddleware', (): void => {
        it('should runs enforce middleware', async (): Promise<void> => {
            const enforceContext = makeContext();

            const nextMock = mock.fn(noopNext);

            const beforeMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === enforceContext);

                    strictEqual(middlewareMock.mock.callCount(), 0);
                    strictEqual(afterMiddlewareMock.mock.callCount(), 0);

                    await next();
                },
            );

            const middlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === enforceContext);

                    strictEqual(beforeMiddlewareMock.mock.callCount(), 1);
                    strictEqual(afterMiddlewareMock.mock.callCount(), 0);

                    await next();
                },
            );

            const afterMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === enforceContext);

                    strictEqual(middlewareMock.mock.callCount(), 1);
                    strictEqual(beforeMiddlewareMock.mock.callCount(), 1);

                    await next();
                },
            );

            const enforceMiddleware = getEnforceMiddleware(
                beforeMiddlewareMock,
                middlewareMock,
                afterMiddlewareMock,
            );

            await enforceMiddleware(enforceContext, nextMock);

            strictEqual(middlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });

    describe('getCaughtMiddleware', (): void => {
        it('should work with error', async (): Promise<void> => {
            const caughtContext = makeContext();

            const caughtError = new Error('Test error');
            const nextMock = mock.fn(() => {
                throw caughtError;
            });

            const handlerMock = mock.fn(
                (context: ContextType, error: Error): void => {
                    ok(context === caughtContext);
                    strictEqual(error, caughtError);
                },
            );

            const caughtMiddleware = getCaughtMiddleware(handlerMock);

            await caughtMiddleware(caughtContext, nextMock);

            strictEqual(handlerMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });

        it('should work without error', async (): Promise<void> => {
            const caughtContext = makeContext();

            const nextMock = mock.fn(noopNext);
            const handlerMock = mock.fn((): void => {});

            const caughtMiddleware = getCaughtMiddleware(handlerMock);

            await caughtMiddleware(caughtContext, nextMock);

            strictEqual(handlerMock.mock.callCount(), 0);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });

    describe('getConcurrencyMiddleware', (): void => {
        it('should runs concurrency middleware', async (): Promise<void> => {
            const concurrencyContext = makeContext();

            concurrencyContext.shouldTrue = false;
            concurrencyContext.shouldFalse = true;

            deepStrictEqual(concurrencyContext, {
                shouldTrue: false,
                shouldFalse: true,
            });

            const nextMock = mock.fn(noopNext);

            const firstMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === concurrencyContext);

                    concurrencyContext.shouldTrue = true;

                    await next();
                },
            );

            const secondMiddlewareMock = mock.fn(
                async (context: ContextType, next: NextMiddleware): Promise<void> => {
                    ok(context === concurrencyContext);

                    concurrencyContext.shouldFalse = false;

                    await next();
                },
            );

            const enforceMiddleware = getConcurrencyMiddleware<ContextType>([
                firstMiddlewareMock as Middleware<ContextType>,
                secondMiddlewareMock as Middleware<ContextType>,
            ]);

            await enforceMiddleware(concurrencyContext, nextMock);

            deepStrictEqual(concurrencyContext, {
                shouldTrue: true,
                shouldFalse: false,
            });

            strictEqual(firstMiddlewareMock.mock.callCount(), 1);
            strictEqual(secondMiddlewareMock.mock.callCount(), 1);
            strictEqual(nextMock.mock.callCount(), 1);
        });
    });
});
