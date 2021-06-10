<p align="center"><img src="https://raw.githubusercontent.com/negezor/middleware-io/master/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://travis-ci.com/negezor/middleware-io"><img src="https://img.shields.io/travis/negezor/middleware-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/middleware-io"><img src="https://img.shields.io/npm/v/middleware-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/middleware-io"><img src="https://img.shields.io/npm/dt/middleware-io.svg?style=flat-square" alt="NPM downloads"></a>
</p>

Modern middleware on Promise

| 📖 [Documentation](docs/) |
|---------------------------|

## Features
- Working with async/await
- Zero dependencies
- Native Promise
- Flexible
- Snippets
- Typings

## Installation
**[Node.js](https://nodejs.org/) 12.0.0 or newer is required**

### Yarn
Recommended
```shell
yarn add middleware-io
```

### NPM
```shell
npm install middleware-io --save
```

## Usage
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
