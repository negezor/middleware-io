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
	getCaughtMiddleware
} from '..';

const makeContext = (): { shouldTrue: boolean; shouldFalse: boolean } => ({
	shouldTrue: true,
	shouldFalse: false
});

type ContextType = ReturnType<typeof makeContext>;

describe('Snippets', (): void => {
	describe('getLazyMiddleware', (): void => {
		it('should work with function', async (): Promise<void> => {
			const lazyContext = makeContext();

			const nextMock = jest.fn(noopNext);
			const middlewareMock = jest.fn(
				(factoryContext: ContextType): Middleware<ContextType> => {
					expect(factoryContext).toBe(lazyContext);

					return async (context: ContextType, next: NextMiddleware): Promise<void> => {
						expect(context).toBe(lazyContext);

						await next();
					};
				}
			);

			const lazyMiddleware = getLazyMiddleware(middlewareMock);

			await lazyMiddleware(lazyContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});

		it('should factory be called once', async (): Promise<void> => {
			const lazyContext = makeContext();

			const nextMock = jest.fn(noopNext);
			const middlewareMock = jest.fn(
				(factoryContext: ContextType): Middleware<ContextType> => {
					expect(factoryContext).toBe(lazyContext);

					return async (context: ContextType, next: NextMiddleware): Promise<void> => {
						expect(context).toBe(lazyContext);

						await next();
					};
				}
			);

			const lazyMiddleware = getLazyMiddleware(middlewareMock);

			const CALLED_TIMES = 10;
			for (let i = 0; i < CALLED_TIMES; i += 1) {
				await lazyMiddleware(lazyContext, nextMock);
			}

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(CALLED_TIMES);
		});
	});

	describe('getTapMiddleware', (): void => {
		it('should runs with force next()', async (): Promise<void> => {
			const tapContext = makeContext();

			const nextMock = jest.fn(noopNext);
			const middlewareMock = jest.fn(
				async (context: ContextType): Promise<void> => {
					expect(context).toBe(tapContext);
				}
			);

			const tapMiddleware = getTapMiddleware(middlewareMock);

			await tapMiddleware(tapContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('getForkMiddleware', (): void => {
		it('should runs with force next()', async (): Promise<void> => {
			const forkContext = makeContext();

			const nextMock = jest.fn(noopNext);
			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(forkContext);

					await next();
				}
			);

			const forkMiddleware = getForkMiddleware(middlewareMock);

			await forkMiddleware(forkContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(0);
			expect(nextMock).toHaveBeenCalledTimes(1);

			await new Promise((resolve: Function): void => {
				setImmediate((): void => {
					expect(middlewareMock).toHaveBeenCalledTimes(1);

					resolve();
				});
			});
		});
	});

	describe('getBranchMiddleware', (): void => {
		it('should runs with static condition', async (): Promise<void> => {
			const branchContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const trueMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(branchContext);

					await next();
				}
			);

			const falseMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(branchContext);

					await next();
				}
			);

			const trueMiddleware = getBranchMiddleware(
				true,
				trueMiddlewareMock,
				falseMiddlewareMock
			);

			const falseMiddleware = getBranchMiddleware(
				false,
				trueMiddlewareMock,
				falseMiddlewareMock
			);

			await trueMiddleware(branchContext, nextMock);
			await falseMiddleware(branchContext, nextMock);

			expect(trueMiddlewareMock).toHaveBeenCalledTimes(1);
			expect(falseMiddlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(2);
		});

		it('should runs with dynamic condition', async (): Promise<void> => {
			const branchContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const trueMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(branchContext);

					await next();
				}
			);

			const falseMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(branchContext);

					await next();
				}
			);

			const trueMiddleware = getBranchMiddleware(
				jest.fn().mockReturnValue(true),
				trueMiddlewareMock,
				falseMiddlewareMock
			);

			const falseMiddleware = getBranchMiddleware(
				jest.fn().mockReturnValue(false),
				trueMiddlewareMock,
				falseMiddlewareMock
			);

			await trueMiddleware(branchContext, nextMock);
			await falseMiddleware(branchContext, nextMock);

			expect(trueMiddlewareMock).toHaveBeenCalledTimes(1);
			expect(falseMiddlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(2);
		});
	});

	describe('getOptionalMiddleware', (): void => {
		it('should runs with static condition', async (): Promise<void> => {
			const optionalContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(optionalContext);

					await next();
				}
			);

			const trueMiddleware = getOptionalMiddleware(
				true,
				middlewareMock
			);

			const falseMiddleware = getOptionalMiddleware(
				false,
				middlewareMock
			);

			await trueMiddleware(optionalContext, nextMock);
			await falseMiddleware(optionalContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(2);
		});

		it('should runs with dynamic condition', async (): Promise<void> => {
			const optionalContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(optionalContext);

					await next();
				}
			);

			const trueMiddleware = getOptionalMiddleware(
				jest.fn().mockReturnValue(true),
				middlewareMock
			);

			const falseMiddleware = getOptionalMiddleware(
				jest.fn().mockReturnValue(false),
				middlewareMock
			);

			await trueMiddleware(optionalContext, nextMock);
			await falseMiddleware(optionalContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(2);
		});
	});

	describe('getFilterMiddleware', (): void => {
		it('should runs with static condition', async (): Promise<void> => {
			const filterContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(filterContext);

					await next();
				}
			);

			const trueMiddleware = getFilterMiddleware(
				true,
				middlewareMock
			);

			const falseMiddleware = getFilterMiddleware(
				false,
				middlewareMock
			);

			await trueMiddleware(filterContext, nextMock);
			await falseMiddleware(filterContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});

		it('should runs with dynamic condition', async (): Promise<void> => {
			const filterContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(filterContext);

					await next();
				}
			);

			const trueMiddleware = getFilterMiddleware(
				jest.fn().mockReturnValue(true),
				middlewareMock
			);

			const falseMiddleware = getFilterMiddleware(
				jest.fn().mockReturnValue(false),
				middlewareMock
			);

			await trueMiddleware(filterContext, nextMock);
			await falseMiddleware(filterContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('getBeforeMiddleware', (): void => {
		it('should runs before middleware', async (): Promise<void> => {
			const beforeContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const beforeMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(beforeContext);

					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					expect(middlewareMock).toHaveBeenCalledTimes(0);

					await next();
				}
			);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(beforeContext);

					expect(beforeMiddlewareMock).toHaveBeenCalledTimes(1);

					await next();
				}
			);

			const beforeMiddleware = getBeforeMiddleware(
				beforeMiddlewareMock,
				middlewareMock
			);

			await beforeMiddleware(beforeContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('getAfterMiddleware', (): void => {
		it('should runs after middleware', async (): Promise<void> => {
			const afterContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(afterContext);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					expect(afterMiddlewareMock).toHaveBeenCalledTimes(0);

					await next();
				}
			);

			const afterMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(afterContext);
					expect(middlewareMock).toHaveBeenCalledTimes(1);

					await next();
				}
			);

			const afterMiddleware = getAfterMiddleware(
				middlewareMock,
				afterMiddlewareMock
			);

			await afterMiddleware(afterContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('getEnforceMiddleware', (): void => {
		it('should runs enforce middleware', async (): Promise<void> => {
			const enforceContext = makeContext();

			const nextMock = jest.fn(noopNext);

			const beforeMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(enforceContext);

					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					expect(middlewareMock).toHaveBeenCalledTimes(0);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					expect(afterMiddlewareMock).toHaveBeenCalledTimes(0);

					await next();
				}
			);

			const middlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(enforceContext);

					expect(beforeMiddlewareMock).toHaveBeenCalledTimes(1);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					expect(afterMiddlewareMock).toHaveBeenCalledTimes(0);

					await next();
				}
			);

			const afterMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(enforceContext);

					expect(middlewareMock).toHaveBeenCalledTimes(1);
					expect(beforeMiddlewareMock).toHaveBeenCalledTimes(1);

					await next();
				}
			);

			const enforceMiddleware = getEnforceMiddleware(
				beforeMiddlewareMock,
				middlewareMock,
				afterMiddlewareMock
			);

			await enforceMiddleware(enforceContext, nextMock);

			expect(middlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('getCaughtMiddleware', (): void => {
		it('should work with error', async (): Promise<void> => {
			const caughtContext = makeContext();

			const caughtError = new Error('Test error');
			const nextMock = jest.fn(() => {
				throw caughtError;
			});

			const handlerMock = jest.fn(
				(context: ContextType, error: Error): void => {
					expect(context).toBe(caughtContext);
					expect(error).toBe(caughtError);
				}
			);

			const caughtMiddleware = getCaughtMiddleware(handlerMock);

			await caughtMiddleware(caughtContext, nextMock);

			expect(handlerMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});

		it('should work without error', async (): Promise<void> => {
			const caughtContext = makeContext();

			const nextMock = jest.fn(noopNext);
			const handlerMock = jest.fn((): void => {});

			const caughtMiddleware = getCaughtMiddleware(handlerMock);

			await caughtMiddleware(caughtContext, nextMock);

			expect(handlerMock).toHaveBeenCalledTimes(0);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('getConcurrencyMiddleware', (): void => {
		it('should runs concurrency middleware', async (): Promise<void> => {
			const concurrencyContext = makeContext();

			concurrencyContext.shouldTrue = false;
			concurrencyContext.shouldFalse = true;

			expect(concurrencyContext).toMatchObject({
				shouldTrue: false,
				shouldFalse: true
			});

			const nextMock = jest.fn(noopNext);

			const firstMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(concurrencyContext);

					concurrencyContext.shouldTrue = true;

					await next();
				}
			) as Middleware<ContextType>;

			const secondMiddlewareMock = jest.fn(
				async (context: ContextType, next: NextMiddleware): Promise<void> => {
					expect(context).toBe(concurrencyContext);

					concurrencyContext.shouldFalse = false;

					await next();
				}
			) as Middleware<ContextType>;

			const enforceMiddleware = getConcurrencyMiddleware<ContextType>([
				firstMiddlewareMock,
				secondMiddlewareMock
			]);

			await enforceMiddleware(concurrencyContext, nextMock);

			expect(concurrencyContext).toMatchObject({
				shouldTrue: true,
				shouldFalse: false
			});

			expect(firstMiddlewareMock).toHaveBeenCalledTimes(1);
			expect(secondMiddlewareMock).toHaveBeenCalledTimes(1);
			expect(nextMock).toHaveBeenCalledTimes(1);
		});
	});
});
