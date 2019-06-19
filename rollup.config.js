import typescript from 'rollup-plugin-typescript2';

import { tmpdir } from 'os';
import { builtinModules } from 'module';
import { join as pathJoin } from 'path';

import pkg from './package.json';

const cacheRoot = pathJoin(tmpdir(), '.rpt2_cache');

const CORE_MODULE_RE = /(^_|\/)/;
const coreModules = builtinModules.filter(name => (
	!CORE_MODULE_RE.test(name)
));

const src = pathJoin(__dirname, 'src');
const lib = pathJoin(__dirname, 'lib');

export default [
	{
		input: pathJoin(src, 'index.ts'),
		plugins: [
			typescript({
				cacheRoot,

				declarationDir: lib,

				tsconfigOverride: {
					outDir: lib,
					rootDir: src,
					include: [src]
				}
			})
		],
		external: [
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.peerDependencies || {}),
			...coreModules
		],
		output: [
			{
				file: `${pkg.main}.js`,
				format: 'cjs',
				exports: 'named'
			},
			{
				file: `${pkg.main}.mjs`,
				format: 'esm'
			}
		]
	}
];
