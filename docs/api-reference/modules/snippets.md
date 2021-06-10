[middleware-io](../README.md) / snippets

# Module: snippets

## Table of contents

### Functions

- [getAfterMiddleware](snippets.md#getaftermiddleware)
- [getBeforeMiddleware](snippets.md#getbeforemiddleware)
- [getBranchMiddleware](snippets.md#getbranchmiddleware)
- [getCaughtMiddleware](snippets.md#getcaughtmiddleware)
- [getConcurrencyMiddleware](snippets.md#getconcurrencymiddleware)
- [getEnforceMiddleware](snippets.md#getenforcemiddleware)
- [getFilterMiddleware](snippets.md#getfiltermiddleware)
- [getForkMiddleware](snippets.md#getforkmiddleware)
- [getLazyMiddleware](snippets.md#getlazymiddleware)
- [getOptionalMiddleware](snippets.md#getoptionalmiddleware)
- [getTapMiddleware](snippets.md#gettapmiddleware)
- [skipMiddleware](snippets.md#skipmiddleware)
- [stopMiddleware](snippets.md#stopmiddleware)

## Functions

### getAfterMiddleware

▸ `Const` **getAfterMiddleware**<T\>(`middleware`, `afterMiddleware`): [Middleware](types.md#middleware)<T\>

Runs the second middleware after the main

Example:

```ts
getAfterMiddleware(
  sendSecureData,
  clearSecurityData
);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [Middleware](types.md#middleware)<T\> |
| `afterMiddleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:219](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L219)

___

### getBeforeMiddleware

▸ `Const` **getBeforeMiddleware**<T\>(`beforeMiddleware`, `middleware`): [Middleware](types.md#middleware)<T\>

Runs the second middleware before the main

Example:

```ts
getBeforeMiddleware(
  myMockMiddleware,
  ouputUserData
);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `beforeMiddleware` | [Middleware](types.md#middleware)<T\> |
| `middleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:193](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L193)

___

### getBranchMiddleware

▸ `Const` **getBranchMiddleware**<T\>(`condition`, `trueMiddleware`, `falseMiddleware`): [Middleware](types.md#middleware)<T\>

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

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [BranchMiddlewareCondition](types.md#branchmiddlewarecondition)<T\> |
| `trueMiddleware` | [Middleware](types.md#middleware)<T\> |
| `falseMiddleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:116](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L116)

___

### getCaughtMiddleware

▸ `Const` **getCaughtMiddleware**<T\>(`errorHandler`): [Middleware](types.md#middleware)<T\>

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

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorHandler` | [CaughtMiddlewareHandler](types.md#caughtmiddlewarehandler)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:298](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L298)

___

### getConcurrencyMiddleware

▸ `Const` **getConcurrencyMiddleware**<T\>(`middlewares`): [Middleware](types.md#middleware)<T\>

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

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middlewares` | [Middleware](types.md#middleware)<T\>[] |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:327](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L327)

___

### getEnforceMiddleware

▸ `Const` **getEnforceMiddleware**<T\>(`beforeMiddleware`, `middleware`, `afterMiddleware`): [Middleware](types.md#middleware)<T\>

Runs middleware before and after the main

Example:

```ts
getEnforceMiddleware(
  prepareData,
  sendData,
  clearData
);

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `beforeMiddleware` | [Middleware](types.md#middleware)<T\> |
| `middleware` | [Middleware](types.md#middleware)<T\> |
| `afterMiddleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:245](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L245)

___

### getFilterMiddleware

▸ `Const` **getFilterMiddleware**<T\>(`condition`, `filterMiddleware`): [Middleware](types.md#middleware)<T\>

Conditionally runs middleware or stops the chain

Example:

```ts
getFilterMiddleware(
  context => context.authorized,
  middlewareForAuthorized
);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [BranchMiddlewareCondition](types.md#branchmiddlewarecondition)<T\> |
| `filterMiddleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:170](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L170)

___

### getForkMiddleware

▸ `Const` **getForkMiddleware**<T\>(`middleware`): [Middleware](types.md#middleware)<T\>

Runs the middleware at the next event loop and force call `next()`

Example:

```ts
getForkMiddleware((context) => {
  statisticsMiddlewares(context).catch(console.error);
});
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:85](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L85)

___

### getLazyMiddleware

▸ `Const` **getLazyMiddleware**<T\>(`factory`): [Middleware](types.md#middleware)<T\>

Lazily asynchronously gets middleware

Example:

```ts
getLazyMiddleware(async (context) => {
  const route = await getSomeRoute(context.path) // Promise<Function>;

  return route;
});
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | [LazyMiddlewareFactory](types.md#lazymiddlewarefactory)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:43](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L43)

___

### getOptionalMiddleware

▸ `Const` **getOptionalMiddleware**<T\>(`condition`, `optionalMiddleware`): [Middleware](types.md#middleware)<T\>

Conditionally runs optional middleware or skips middleware

Example:

```ts
getOptionalMiddleware(
  context => context.user.isAdmin,
  addFieldsForAdmin
);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [BranchMiddlewareCondition](types.md#branchmiddlewarecondition)<T\> |
| `optionalMiddleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:147](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L147)

___

### getTapMiddleware

▸ `Const` **getTapMiddleware**<T\>(`middleware`): [Middleware](types.md#middleware)<T\>

Runs the middleware and force call `next()`

Example:

```ts
getTapMiddleware((context) => {
  console.log('Context', context);
});
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [Middleware](types.md#middleware)<T\> |

#### Returns

[Middleware](types.md#middleware)<T\>

#### Defined in

[snippets.ts:66](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L66)

___

### skipMiddleware

▸ `Const` **skipMiddleware**<T\>(`context`, `next`): `Promise`<unknown\>

Call `next()` in middleware

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |
| `next` | [NextMiddleware](types.md#nextmiddleware) |

#### Returns

`Promise`<unknown\>

#### Defined in

[snippets.ts:17](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L17)

___

### stopMiddleware

▸ `Const` **stopMiddleware**<T\>(`context`, `next`): `Promise`<void\>

Does not call `next()` in middleware

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |
| `next` | [NextMiddleware](types.md#nextmiddleware) |

#### Returns

`Promise`<void\>

#### Defined in

[snippets.ts:26](https://github.com/negezor/middleware-io/blob/f841c99/src/snippets.ts#L26)
