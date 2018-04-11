import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

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
				exclude: [
					'node_modules/**'
				],
			}),
			commonjs()
		],
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				exports: 'named'
			},
			{
				file: pkg.module,
				format: 'es'
			}
		]
	}
];
