export type NextMiddleware = () => Promise<any>;

export type Middleware<T> = (context: T, next: NextMiddleware) => any;
