import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const babelConfig = require('./babel.config');

export default [
	{
		input: 'src/index.mjs',
		external: ['util'],
		plugins: [
			resolve({
				extensions: ['.mjs', '.js'],
				preferBuiltins: true,
			}),
			babel({
				...babelConfig,

				exclude: [
					'node_modules/**'
				],

				babelrc: false
			}),
			commonjs()
		],
		output: [
			{
				file: `${pkg.main}.js`,
				format: 'cjs',
				exports: 'named'
			},
			{
				file: `${pkg.main}.mjs`,
				format: 'es'
			}
		]
	}
];
