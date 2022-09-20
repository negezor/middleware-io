<p align="center"><img src="https://raw.githubusercontent.com/negezor/middleware-io/master/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://github.com/negezor/middleware-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/workflow/status/negezor/middleware-io/Middleware-IO CI?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/middleware-io"><img src="https://img.shields.io/npm/v/middleware-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/middleware-io"><img src="https://img.shields.io/npm/dt/middleware-io.svg?style=flat-square" alt="NPM downloads"></a>
</p>

> **Middleware-IO** - Modern middleware on Promise

| 📖 [Documentation](docs/) |
|---------------------------|

## Features

1. **Self-Sufficient.** The library has zero dependencies.
2. **Reliable.** The library is written in **TypeScript** and covered by tests.
3. **Modern.** The library comes with native ESM support
3. **Powerful.** Supports following additional features:
	- The library has enough built-in snippets;
	- The middleware chain builder;

## Installation
> **[Node.js](https://nodejs.org/) 12.0.0 or newer is required**

- **Using `npm`** (recommended)
	```shell
	npm i middleware-io
	```
- **Using `Yarn`**
  ```shell
  yarn add middleware-io
  ```
- **Using `pnpm`**
  ```shell
  pnpm add middleware-io
  ```

## Example usage

```js
import { compose } from 'middleware-io';

const composedMiddleware = compose([
	async (context, next) => {
		// Step 1

		await next();

		// Step 4

		// Print the current date from the next middleware
		console.log(context.now);
	},
	async (context, next) => {
		// Step 2

		context.now = Date.now();

		await next();

		// Step 3
	}
]);

composedMiddleware({}, () => { /* Last handler (next) */ })
	.then(() => {
		console.log('Middleware finished work');
	})
	.catch(console.error);
```
