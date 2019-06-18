/**
 * Call the next middleware from the chain
 */
export type NextMiddleware = () => Promise<any>;

/**
 * Basic middleware
 */
export type Middleware<T> = (context: T, next: NextMiddleware) => any;

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
