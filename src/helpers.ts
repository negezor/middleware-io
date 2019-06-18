export const assertMiddleware = (middleware: Function): void => {
	if (typeof middleware !== 'function') {
		throw new TypeError('Middleware must be composed of function!');
	}
};

export const assertMiddlewares = (middlewares: Function[]): void => (
	middlewares.forEach(assertMiddleware)
);

export const wrapMiddlewareNextCall = async <T>(context: T, middleware: Function) => {
	let called = false;

	await middleware(context, () => {
		called = true;
	});

	return called;
};
