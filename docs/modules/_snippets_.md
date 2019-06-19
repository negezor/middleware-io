> ## [middleware-io](../README.md)

["snippets"](_snippets_.md) /

# External module: "snippets"

### Index

#### Functions

* [getAfterMiddleware](_snippets_.md#const-getaftermiddleware)
* [getBeforeMiddleware](_snippets_.md#const-getbeforemiddleware)
* [getBranchMiddleware](_snippets_.md#const-getbranchmiddleware)
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

▸ **getAfterMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹*`T`*›, `afterMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:212](url)*

Runs the second middleware after the main

Example:

```ts
getAfterMiddleware(
sendSecureData,
clearSecurityData
);
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹*`T`*› |
`afterMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getBeforeMiddleware

▸ **getBeforeMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹*`T`*›, `beforeMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:186](url)*

Runs the second middleware before the main

Example:

```ts
getBeforeMiddleware(
ouputUserData,
myMockMiddleware
);
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹*`T`*› |
`beforeMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getBranchMiddleware

▸ **getBranchMiddleware**<**T**>(`condition`: [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹*`T`*›, `trueMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›, `falseMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:109](url)*

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

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹*`T`*› |
`trueMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |
`falseMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getConcurrencyMiddleware

▸ **getConcurrencyMiddleware**<**T**>(...`middlewares`: [Middleware](_types_.md#middleware)‹*`T`*›[]): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:277](url)*

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

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`...middlewares` | [Middleware](_types_.md#middleware)‹*`T`*›[] |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getEnforceMiddleware

▸ **getEnforceMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹*`T`*›, `beforeMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›, `afterMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:238](url)*

Runs middleware before and after the main

Example:

```ts
getEnforceMiddleware(
prepareData,
sendData,
clearData
);

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹*`T`*› |
`beforeMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |
`afterMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getFilterMiddleware

▸ **getFilterMiddleware**<**T**>(`condition`: [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹*`T`*›, `filterMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:163](url)*

Conditionally runs middleware or stops the chain

Example:

```ts
getFilterMiddleware(
context => context.authorized,
middlewareForAuthorized
);
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹*`T`*› |
`filterMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getForkMiddleware

▸ **getForkMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:78](url)*

Runs the middleware at the next event loop and force call `next()`

Example:

```ts
getForkMiddleware((context) => {
statisticsMiddlewares(context).catch(console.error);
});
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getLazyMiddleware

▸ **getLazyMiddleware**<**T**>(`factory`: [LazyMiddlewareFactory](_types_.md#lazymiddlewarefactory)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:40](url)*

Lazily asynchronously gets middleware

Example:

```ts
getLazyMiddleware(async (context) => {
const route = await getSomeRoute(context.path) // Promise<Function>;

return route;
});
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [LazyMiddlewareFactory](_types_.md#lazymiddlewarefactory)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getOptionalMiddleware

▸ **getOptionalMiddleware**<**T**>(`condition`: [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹*`T`*›, `optionalMiddleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:140](url)*

Conditionally runs optional middleware or skips middleware

Example:

```ts
getOptionalMiddleware(
context => context.user.isAdmin,
addFieldsForAdmin
);
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)‹*`T`*› |
`optionalMiddleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` getTapMiddleware

▸ **getTapMiddleware**<**T**>(`middleware`: [Middleware](_types_.md#middleware)‹*`T`*›): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [snippets.ts:59](url)*

Runs the middleware and force call `next()`

Example:

```ts
getTapMiddleware((context) => {
console.log('Context', context);
});
```

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](_types_.md#middleware)‹*`T`*› |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

___

### `Const` skipMiddleware

▸ **skipMiddleware**<**T**>(`context`: `T`, `next`: [NextMiddleware](_types_.md#nextmiddleware)): *`Promise<MiddlewareReturn>`*

*Defined in [snippets.ts:16](url)*

Call `next()` in middleware

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`context` | `T` |
`next` | [NextMiddleware](_types_.md#nextmiddleware) |

**Returns:** *`Promise<MiddlewareReturn>`*

___

### `Const` stopMiddleware

▸ **stopMiddleware**<**T**>(`context`: `T`, `next`: [NextMiddleware](_types_.md#nextmiddleware)): *void*

*Defined in [snippets.ts:25](url)*

Does not call `next()` in middleware

**Type parameters:**

■` T`

**Parameters:**

Name | Type |
------ | ------ |
`context` | `T` |
`next` | [NextMiddleware](_types_.md#nextmiddleware) |

**Returns:** *void*

___