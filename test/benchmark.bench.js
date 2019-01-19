const { MiddlewareStatus, compose, noopNext } = require('..');

suite('MiddlewareStatus', () => {
	set('type', 'adaptive');
	set('mintime', 1000);
	set('delay', 100);

	const logic = async () => true;

	const fn = async (ctx, next) => {
		await logic();
		await next();
		await logic();
	};

	for (let exp = 0; exp <= 10; exp += 1) {
		const count = 2 ** exp;

		const middlewares = Array(count).fill(fn);

		const middleware = new MiddlewareStatus(middlewares);

		bench(`(fn * ${count})`, (done) => {
			middleware.run({}).then(done, done);
		});
	}
});

suite('Compose', () => {
	set('type', 'adaptive');
	set('mintime', 1000);
	set('delay', 100);

	const logic = async () => true;

	const fn = async (ctx, next) => {
		await logic();
		await next();
		await logic();
	};

	for (let exp = 0; exp <= 10; exp += 1) {
		const count = 2 ** exp;

		const middlewares = Array(count).fill(fn);

		const middleware = compose(middlewares);

		bench(`(fn * ${count})`, (done) => {
			middleware({}, noopNext).then(done, done);
		});
	}
});
