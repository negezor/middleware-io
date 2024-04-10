import { Bench, type Fn } from 'tinybench';

import { type Middleware, compose, noopNext } from '..';

const numberFormat = (number: number) => (
    new Intl.NumberFormat('en-US').format(number)
);

const makeSuite = ({ name }: { name: string }) => {
    const suite = new Bench({
        iterations: 30,
    });

    suite.addEventListener('start', () => {
        process.stdout.write(`${name}\n\n`.padStart(name.length + 8));
    });

    suite.addEventListener('cycle', ({ task }) => {
        // biome-ignore lint/style/noNonNullAssertion: after cycle task.result always exist
        const { hz, rme } = task.result!;
        const text = `${task.name} » ${numberFormat(Number(hz.toFixed(hz < 100 ? 2 : 0)))} op/s ±${rme.toFixed(2)}%\n`;

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(text.padStart(text.length + 8));
    })


    suite.addEventListener('complete', () => {
        process.stdout.write('\n');
    });

    return {
        add: (testName: string, options: { fn: Fn }) => {
            suite.add(testName, options.fn, {
                ...options,

                beforeAll() {
                    const text = `wait » ${testName}`;

                    process.stdout.write(text.padStart(testName.length + 17));
                },
            });
        },
        run: suite.run.bind(suite),
    };
};

const composeSuite = makeSuite({
    name: 'Compose',
});

for (let exp = 0; exp <= 10; exp += 1) {
    const count = 2 ** exp;

    const logic = async () => true;

    const fn: Middleware<unknown> = async (ctx, next) => {
        await logic();
        await next();
        await logic();
    };

    const middlewares = Array(count).fill(fn);

    const middleware = compose(middlewares);

    composeSuite.add(`(fn * ${count})`, {
        fn: () => (
            middleware({}, noopNext)
        ),
    });
}

(async () => {
    for (const benchmark of [composeSuite]) {
        await benchmark.run();
    }
})();
