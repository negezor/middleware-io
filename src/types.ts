/**
 * Returns the type of response middleware
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextMiddlewareReturn = any;

/**
 * Call the next middleware from the chain
 */
export type NextMiddleware = () => Promise<NextMiddlewareReturn>;

/**
 * Returns the type of response middleware
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MiddlewareReturn = any;

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
