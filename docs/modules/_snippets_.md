[middleware-io - v2.2.0](../README.md) › ["snippets"](_snippets_.md)

# External module: "snippets"

## Index

### Functions

* [getAfterMiddleware](_snippets_.md#const-getaftermiddleware)
* [getBeforeMiddleware](_snippets_.md#const-getbeforemiddleware)
* [getBranchMiddleware](_snippets_.md#const-getbranchmiddleware)
* [getCaughtMiddleware](_snippets_.md#const-getcaughtmiddleware)
* [getConcurrencyMiddleware](_snippets_.md#const-getconcurrencymiddleware)
* [getEnforceMiddleware](_snippets_.md#const-getenforcemiddleware)
* [getFilterMiddleware](_snippets_.md#const-getfiltermiddleware)
* [getForkMiddleware](_snippets_.md#const-getforkmiddleware)
* [getLazyMiddleware](_snippets_.md#const-getlazymiddleware)
* [getOptionalMiddleware](_snippets_.md#const-getoptionalmiddleware)
* [getTapMiddleware](_snippets_.md#const-gettapmiddleware)
* [skipMiddleware](_snippets_.md#const-skipmiddleware)
* [stopMiddleware](_snippets_.md#const-stopmiddleware)

## Functions

### `Const` getAfterMiddleware

▸ **getAfterMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹T›, `afterMiddleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:219](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L219)*

Runs the second middleware after the main

Example:

```ts
getAfterMiddleware(
  sendSecureData,
  clearSecurityData
);
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹T› |
`afterMiddleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getBeforeMiddleware

▸ **getBeforeMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹T›, `beforeMiddleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:193](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L193)*

Runs the second middleware before the main

Example:

```ts
getBeforeMiddleware(
  ouputUserData,
  myMockMiddleware
);
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹T› |
`beforeMiddleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getBranchMiddleware

▸ **getBranchMiddleware**<**T**>(`condition`: [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹T›, `trueMiddleware`: [Middleware](_types_.md#middleware)‹T›, `falseMiddleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:116](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L116)*

By condition splits the middleware

Example:

```ts
getBranchMiddleware(
  async context => context.is('Content-Type', 'json'),
  myBodyParser.json(),
  myBodyParser.urlencoded()
);
```

Static condition

```ts
getBranchMiddleware(
  process.env.NODE_ENV === 'production',
  logger.loggedContextToFile(),
  logger.loggedContextToConsole()
);
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹T› |
`trueMiddleware` | [Middleware](_types_.md#middleware)‹T› |
`falseMiddleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getCaughtMiddleware

▸ **getCaughtMiddleware**<**T**>(`errorHandler`: [CaughtMiddlewareHandler](_types_.md#caughtmiddlewarehandler)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:298](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L298)*

Catches errors in the middleware chain

Example:
```js
getCaughtMiddleware((context, error) => {
  if (error instanceof NetworkError) {
    return context.send('Sorry, network issues 😔');
  }

  throw error;
})
```

Without a snippet, it would look like this:

```js
async (context, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof NetworkError) {
      return context.send('Sorry, network issues 😔');
    }

    throw error;
  }
};
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`errorHandler` | [CaughtMiddlewareHandler](_types_.md#caughtmiddlewarehandler)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getConcurrencyMiddleware

▸ **getConcurrencyMiddleware**<**T**>(`middlewares`: [Middleware](_types_.md#middleware)‹T›[]): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:327](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L327)*

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

**Warning: Error interrupts all others**

Example:

```ts
getConcurrencyMiddleware(
  initializeUser,
  initializeSession,
  initializeDatabase
);
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`middlewares` | [Middleware](_types_.md#middleware)‹T›[] |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getEnforceMiddleware

▸ **getEnforceMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹T›, `beforeMiddleware`: [Middleware](_types_.md#middleware)‹T›, `afterMiddleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:245](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L245)*

Runs middleware before and after the main

Example:

```ts
getEnforceMiddleware(
  prepareData,
  sendData,
  clearData
);

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹T› |
`beforeMiddleware` | [Middleware](_types_.md#middleware)‹T› |
`afterMiddleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getFilterMiddleware

▸ **getFilterMiddleware**<**T**>(`condition`: [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹T›, `filterMiddleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:170](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L170)*

Conditionally runs middleware or stops the chain

Example:

```ts
getFilterMiddleware(
  context => context.authorized,
  middlewareForAuthorized
);
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹T› |
`filterMiddleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getForkMiddleware

▸ **getForkMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:85](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L85)*

Runs the middleware at the next event loop and force call `next()`

Example:

```ts
getForkMiddleware((context) => {
  statisticsMiddlewares(context).catch(console.error);
});
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getLazyMiddleware

▸ **getLazyMiddleware**<**T**>(`factory`: [LazyMiddlewareFactory](_types_.md#lazymiddlewarefactory)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:43](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L43)*

Lazily asynchronously gets middleware

Example:

```ts
getLazyMiddleware(async (context) => {
  const route = await getSomeRoute(context.path) // Promise<Function>;

  return route;
});
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [LazyMiddlewareFactory](_types_.md#lazymiddlewarefactory)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getOptionalMiddleware

▸ **getOptionalMiddleware**<**T**>(`condition`: [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹T›, `optionalMiddleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:147](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L147)*

Conditionally runs optional middleware or skips middleware

Example:

```ts
getOptionalMiddleware(
  context => context.user.isAdmin,
  addFieldsForAdmin
);
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹T› |
`optionalMiddleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` getTapMiddleware

▸ **getTapMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹T›): *[Middleware](_types_.md#middleware)‹T›*

*Defined in [snippets.ts:66](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L66)*

Runs the middleware and force call `next()`

Example:

```ts
getTapMiddleware((context) => {
  console.log('Context', context);
});
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *[Middleware](_types_.md#middleware)‹T›*

___

### `Const` skipMiddleware

▸ **skipMiddleware**<**T**>(`context`: T, `next`: [NextMiddleware](_types_.md#nextmiddleware)): *Promise‹[MiddlewareReturn](_types_.md#middlewarereturn)›*

*Defined in [snippets.ts:17](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L17)*

Call `next()` in middleware

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |
`next` | [NextMiddleware](_types_.md#nextmiddleware) |

**Returns:** *Promise‹[MiddlewareReturn](_types_.md#middlewarereturn)›*

___

### `Const` stopMiddleware

▸ **stopMiddleware**<**T**>(`context`: T, `next`: [NextMiddleware](_types_.md#nextmiddleware)): *Promise‹void›*

*Defined in [snippets.ts:26](https://github.com/negezor/middleware-io/blob/33c0846/src/snippets.ts#L26)*

Does not call `next()` in middleware

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |
`next` | [NextMiddleware](_types_.md#nextmiddleware) |

**Returns:** *Promise‹void›*
