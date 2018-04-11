import Benchmark from 'benchmark';

import Middleware from '../';

const { Suite } = Benchmark;

describe('Benchmark', () => {
	it('return promise or call async function', function threeAsyncMiddleware(done) {
		this.timeout(180000);

		const awaitFunction = new Middleware([
			async (ctx, next) => await next(),
			async (ctx, next) => await next(),
			async (ctx, next) => await next()
		]);
		const returnPromise = new Middleware([
			(ctx, next) => next(),
			(ctx, next) => next(),
			(ctx, next) => next()
		]);

		const suite = new Suite();

		suite.add('await function', {
			defer: true,
			async fn(deferred) {
				try {
					await awaitFunction.run({});

					deferred.resolve();
				} catch (e) {
					deferred.resolve(e);
				}
			}
		});

		suite.add('return promise', {
			defer: true,
			async fn(deferred) {
				try {
					await returnPromise.run({});

					deferred.resolve();
				} catch (e) {
					deferred.resolve(e);
				}
			}
		});

		suite
			.on('error', (error) => {
				suite.abort();

				done(error);
			})
			.on('cycle', (event) => {
				// eslint-disable-next-line no-console
				console.log(`        ${String(event.target)}`);
			})
			.on('complete', function onComplete() {
				// eslint-disable-next-line no-console
				console.log(`\n        Fastest is ${this.filter('fastest').map('name')}`);

				done();
			});

		suite.run({
			async: true
		});
	});
});
