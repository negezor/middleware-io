<p align="center"><img src="https://raw.githubusercontent.com/negezor/middleware-io/master/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://travis-ci.org/negezor/middleware-io"><img src="https://img.shields.io/travis/negezor/middleware-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/middleware-io"><img src="https://img.shields.io/npm/v/middleware-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/middleware-io"><img src="https://img.shields.io/npm/dt/middleware-io.svg?style=flat-square" alt="NPM downloads"></a>
</p>

Modern middleware with promises and status

## Features
- Working with async/await
- Native promise
- Flexible

## Installation
**[Node.js](https://nodejs.org/) 8.0.0 or newer is required**

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
import Middleware from 'middleware-io';

const middleware = new Middleware();

middleware.use(async (context, next) => {
	// Step 1

	await next();

	// Step 4

	// Print the current date from the next middleware
	console.log(context.now);
});

middleware.use(async (context, next) => {
	// Step 2

	context.now = Date.now();

	await next();

	// Step 3
});

middleware.run({})
.then((status) => {
	// status.finished => true
	// status.contexts => [{now: <now>}]
});
```

## API Reference

### Constructor
Initialize new Middleware

```js
new Middleware(...middlewares);
```

| Param        | Type       | Description          |
|--------------|------------|----------------------|
| middlewares  | Function[] | Middleware functions |

### use
Registers a middleware

```js
middleware.use(middleware); // => this
```

| Param       | Type     | Description         |
|-------------|----------|---------------------|
| middleware  | Function | Middleware function |

```js
middleware.use(middlewares); // => this
```

```js
middleware.use(...middlewares); // => this
```

| Param       | Type       | Description          |
|-------------|------------|----------------------|
| middlewares | Function[] | Middleware functions |

### run
Run chain a middleware.

```js
middleware.run(context); // => Promise<Object>
```

| Param   | Type  | Description |
|---------|-------|-------------|
| context | mixed | Context     |

```js
middleware.run(...contexts); // => Promise<Object>
```

| Param    | Type    | Description |
|----------|---------|-------------|
| contexts | mixed[] | Contexts    |

Promise returns object

| Options  | Type    | Description                   |
|----------|---------|-------------------------------|
| contexts | mixed[] | All contexts pasted           |
| finished | boolean | Passed through all middleware |
