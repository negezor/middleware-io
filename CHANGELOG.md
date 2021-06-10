# Change Log
## [2.8.0] - 2021.06.10
### Breaking Change
- Drop support Node.JS 10

## [2.7.0] - 2021.06.10
### Feature
- Using [exports](https://nodejs.org/api/packages.html#packages_package_entry_points) in `package.json`

### Updated
- Updated dev dependencies
- Updated generated docs

## [2.6.0] - 2021.03.28
### Updated
- Now uses `UnknownObject` instead of `object` type
- Updated dev dependencies
- Updated generated docs

## [2.5.0] - 2020.02.21
### Added
- Composer now has an inherited generic

### Updated
- Compose correspond koa-compose
- Updated dev dependencies
- Updated generated docs

## [2.4.0] - 2020.01.20
### BREAKING CHNAGE
- In snippets `getBeforeMiddleware` and `getEnforceMiddleware` the order of the arguments has changed
- Composer now requires generic with object restriction

### Fixed
- Multiple next calls in compose now throw an asynchronous error
- In snippets `getBeforeMiddleware`, `getAfterMiddleware`, `getEnforceMiddleware` and `getConcurrencyMiddleware` an error will be thrown for several calls next
- Comments typos fixed

### Updated
- Types `NextMiddlewareReturn` and `MiddlewareReturn` now unknown instead of any
- Updated dev dependencies
- Updated generated docs

## [2.3.0] - 2020.01.03
### Added
- Added `builder` static method for `Composer`
- Added `length` getter for `Composer`

### Updated
- Updated generated docs

## [2.2.0] - 2020.01.03
### BREAKING CHNAGE
- Drop support `Node.js 8`

### Added
- Added `clone` method for `Composer`

### Fixed
- Snippet `stopMiddleware` now return `Promise`

### Updated
- Updated dev dependencies
- Updated generated docs
- Updated TypeScript config

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
