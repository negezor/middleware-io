export type NextMiddleware = () => Promise<any>;

export type NextMiddlewarePayload<V> = () => Promise<V>;

export type Middleware<T> = (context: T, next: NextMiddleware) => any;

export type MiddlewarePayload<T, V> = (context: T, next: NextMiddlewarePayload<V>) => any;

export type MiddlewareStatusChain = {
	finished: boolean;
};
