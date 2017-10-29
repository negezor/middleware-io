import Middleware from '../../middleware';

suite('middleware', () => {
	set('iterations', 10000);

	const middleware = new Middleware();

	middleware.use([
		async (ctx, next) => await next(),
		async (ctx, next) => await next(),
		async (ctx, next) => await next()
	]);

	bench('max calls', done => (
		middleware.run({}).then(done)
	));
});
