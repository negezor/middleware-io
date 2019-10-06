# Change Log

## [2.1.0] - 2019.10.06
### Added
- Added `getCaughtMiddleware` snippet
- Added tests for `getCaughtMiddleware` and `getLazyMiddleware`

### Fixed
- Fixed missing cache in `getLazyMiddleware`
- Fixed example in README.md

### Updated
- Updated dev dependencies
- Updated generated docs

## [2.0.0] - 2019.06.19
### Added
- Added `Composer`, a simple middleware compose builder
- Added `getLazyMiddleware`, `getTapMiddleware`, `getForkMiddleware`, `getEnforceMiddleware`, `getConcurrencyMiddleware` snippets 
- Added mini-optimization for `compose`
- Added tests for snippets
- Added tests for `Composer`

### Updated
- Rewrited code with full types
- Now using eslint instead of tslint
- Rewritten benchmark with matcha on benchmark.js

### Major
- Export compose by default
- Deleted `MiddlewareStatus`, use compose

## [1.0.0] - 2019.01.13
### Added
- Added compose functions
- Added snippets middleware

### Updated
- Switch to TypeScript

### Major
- Delete multiple input contexts
- Usage only array for added middleware

## [0.0.8] - 2018.09.11
### Added
- Added length
- Added custom tag in toString()

### Updated
- Updated dependencies
- Improved build

## [0.0.7] - 2018.07.25
### Updated
- Updated dependencies
- Migrating to jest
- Optimization of the status

## [0.0.6] - 2018.04.11
### Added
- Support `--experimental-modules`
- Using [rollupjs](https://github.com/rollup/rollup) for build

### Updated
- Refactoring

## [0.0.5] - 2018.03.01
### Updated
- Switch CLRF to LF

## [0.0.4] - 2018.02.24
### Updated
- All dependencies
- Now mjs files are used
- Fixed README.md install

## [0.0.1] - 2017.10.29
### Added
- Initial commit
