const { Suite } = require('benchmark');

const { MiddlewareStatus, compose, noopNext } = require('..');

const numberFormat = number => (
	new Intl.NumberFormat('en-US').format(number)
);

const makeSuite = ({ name }) => {
	const suite = new Suite();

	suite.on('start', () => {
		process.stdout.write(`${name}\n\n`.padStart(name.length + 8));
	});

	suite.on('cycle', ({ target }) => {
		const { hz } = target;
		const text = `${target.name} » ${numberFormat(hz.toFixed(hz < 100 ? 2 : 0))} op/s ±${target.stats.rme.toFixed(2)}%\n`;

		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(text.padStart(text.length + 8));
	});

	suite.on('complete', () => {
		process.stdout.write('\n');
	});

	return {
		add: (testName, options = {}) => {
			suite.add(testName, {
				...options,

				onStart({ target }) {
					const text = `wait » ${target.name}`;

					process.stdout.write(text.padStart(target.name.length + 17));
				}
			});
		},
		run: suite.run.bind(suite)
	};
};

const composeSuite = makeSuite({
	name: 'Compose'
});

for (let exp = 0; exp <= 10; exp += 1) {
	const count = 2 ** exp;

	const logic = async () => true;

	const fn = async (ctx, next) => {
		await logic();
		await next();
		await logic();
	};

	const middlewares = Array(count).fill(fn);

	const middleware = compose(middlewares);

	composeSuite.add(`(fn * ${count})`, {
		defer: true,
		fn: (deferred) => {
			middleware({}, noopNext)
				.then(() => deferred.resolve());
		}
	});
}

(async () => {
	for (const benchmark of [composeSuite]) {
		await new Promise(resolve => (
			benchmark
				.run({
					async: false
				})
				.on('complete', resolve)
		));
	}
})();
