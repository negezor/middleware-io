/**
 * Returns the type of response middleware
 */
export type NextMiddlewareReturn = unknown;

/**
 * Call the next middleware from the chain
 */
export type NextMiddleware = () => Promise<NextMiddlewareReturn>;

/**
 * Returns the type of response middleware
 */
export type MiddlewareReturn = unknown;

/**
 * Basic middleware
 */
export type Middleware<T> = (context: T, next: NextMiddleware) => MiddlewareReturn;

/**
 * Asynchronous function for branch condition
 */
export type BranchMiddlewareConditionFunction<T> = (context: T) => Promise<boolean> | boolean;

/**
 * Possible types for branch condition
 */
export type BranchMiddlewareCondition<T> = BranchMiddlewareConditionFunction<T> | boolean;

/**
 * Asynchronous factory to create middleware
 */
export type LazyMiddlewareFactory<T> = (context: T) => Promise<Middleware<T>> | Middleware<T>;

/**
 * Handler for catching errors in middleware chains
 */
export type CaughtMiddlewareHandler<T> = (context: T, error: Error) => MiddlewareReturn;
