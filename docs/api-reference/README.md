middleware-io

# middleware-io

## Table of contents

### References

- [default](README.md#default)

### Classes

- [Composer](classes/Composer.md)

### Type Aliases

- [BranchMiddlewareCondition](README.md#branchmiddlewarecondition)
- [BranchMiddlewareConditionFunction](README.md#branchmiddlewareconditionfunction)
- [CaughtMiddlewareHandler](README.md#caughtmiddlewarehandler)
- [LazyMiddlewareFactory](README.md#lazymiddlewarefactory)
- [Middleware](README.md#middleware)
- [MiddlewareReturn](README.md#middlewarereturn)
- [NextMiddleware](README.md#nextmiddleware)
- [NextMiddlewareReturn](README.md#nextmiddlewarereturn)
- [UnknownObject](README.md#unknownobject)

### Functions

- [compose](README.md#compose)
- [getAfterMiddleware](README.md#getaftermiddleware)
- [getBeforeMiddleware](README.md#getbeforemiddleware)
- [getBranchMiddleware](README.md#getbranchmiddleware)
- [getCaughtMiddleware](README.md#getcaughtmiddleware)
- [getConcurrencyMiddleware](README.md#getconcurrencymiddleware)
- [getEnforceMiddleware](README.md#getenforcemiddleware)
- [getFilterMiddleware](README.md#getfiltermiddleware)
- [getForkMiddleware](README.md#getforkmiddleware)
- [getLazyMiddleware](README.md#getlazymiddleware)
- [getOptionalMiddleware](README.md#getoptionalmiddleware)
- [getTapMiddleware](README.md#gettapmiddleware)
- [noopNext](README.md#noopnext)
- [skipMiddleware](README.md#skipmiddleware)
- [stopMiddleware](README.md#stopmiddleware)

## References

### default

Renames and re-exports [compose](README.md#compose)

## Type Aliases

### BranchMiddlewareCondition

Ƭ **BranchMiddlewareCondition**<`T`\>: [`BranchMiddlewareConditionFunction`](README.md#branchmiddlewareconditionfunction)<`T`\> \| `boolean`

Possible types for branch condition

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:34](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L34)

___

### BranchMiddlewareConditionFunction

Ƭ **BranchMiddlewareConditionFunction**<`T`\>: (`context`: `T`) => `Promise`<`boolean`\> \| `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`context`): `Promise`<`boolean`\> \| `boolean`

Asynchronous function for branch condition

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |

##### Returns

`Promise`<`boolean`\> \| `boolean`

#### Defined in

[types.ts:29](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L29)

___

### CaughtMiddlewareHandler

Ƭ **CaughtMiddlewareHandler**<`T`\>: (`context`: `T`, `error`: `Error`) => [`MiddlewareReturn`](README.md#middlewarereturn)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`context`, `error`): [`MiddlewareReturn`](README.md#middlewarereturn)

Handler for catching errors in middleware chains

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |
| `error` | `Error` |

##### Returns

[`MiddlewareReturn`](README.md#middlewarereturn)

#### Defined in

[types.ts:44](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L44)

___

### LazyMiddlewareFactory

Ƭ **LazyMiddlewareFactory**<`T`\>: (`context`: `T`) => `Promise`<[`Middleware`](README.md#middleware)<`T`\>\> \| [`Middleware`](README.md#middleware)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`context`): `Promise`<[`Middleware`](README.md#middleware)<`T`\>\> \| [`Middleware`](README.md#middleware)<`T`\>

Asynchronous factory to create middleware

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |

##### Returns

`Promise`<[`Middleware`](README.md#middleware)<`T`\>\> \| [`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[types.ts:39](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L39)

___

### Middleware

Ƭ **Middleware**<`T`\>: (`context`: `T`, `next`: [`NextMiddleware`](README.md#nextmiddleware)) => [`MiddlewareReturn`](README.md#middlewarereturn)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`context`, `next`): [`MiddlewareReturn`](README.md#middlewarereturn)

Basic middleware

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |
| `next` | [`NextMiddleware`](README.md#nextmiddleware) |

##### Returns

[`MiddlewareReturn`](README.md#middlewarereturn)

#### Defined in

[types.ts:24](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L24)

___

### MiddlewareReturn

Ƭ **MiddlewareReturn**: `unknown`

Returns the type of response middleware

#### Defined in

[types.ts:14](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L14)

___

### NextMiddleware

Ƭ **NextMiddleware**: () => `Promise`<[`NextMiddlewareReturn`](README.md#nextmiddlewarereturn)\>

#### Type declaration

▸ (): `Promise`<[`NextMiddlewareReturn`](README.md#nextmiddlewarereturn)\>

Call the next middleware from the chain

##### Returns

`Promise`<[`NextMiddlewareReturn`](README.md#nextmiddlewarereturn)\>

#### Defined in

[types.ts:9](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L9)

___

### NextMiddlewareReturn

Ƭ **NextMiddlewareReturn**: `unknown`

Returns the type of response middleware

#### Defined in

[types.ts:4](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L4)

___

### UnknownObject

Ƭ **UnknownObject**: `Record`<`string`, `unknown`\>

Instead of object

#### Defined in

[types.ts:19](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L19)

## Functions

### compose

▸ **compose**<`T`\>(`middlewares`): [`Middleware`](README.md#middleware)<`T`\>

Compose an array of middleware handlers into a single handler

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`Middleware`](README.md#middleware)<`T`\>[] | The array of middleware |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

Composed middleware

#### Defined in

[compose.ts:17](https://github.com/negezor/middleware-io/blob/62c3dac/src/compose.ts#L17)

___

### getAfterMiddleware

▸ **getAfterMiddleware**<`T`\>(`middleware`, `afterMiddleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `middleware` | [`Middleware`](README.md#middleware)<`T`\> |
| `afterMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:219](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L219)

___

### getBeforeMiddleware

▸ **getBeforeMiddleware**<`T`\>(`beforeMiddleware`, `middleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `beforeMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |
| `middleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:193](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L193)

___

### getBranchMiddleware

▸ **getBranchMiddleware**<`T`\>(`condition`, `trueMiddleware`, `falseMiddleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `condition` | [`BranchMiddlewareCondition`](README.md#branchmiddlewarecondition)<`T`\> |
| `trueMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |
| `falseMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:116](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L116)

___

### getCaughtMiddleware

▸ **getCaughtMiddleware**<`T`\>(`errorHandler`): [`Middleware`](README.md#middleware)<`T`\>

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
| `errorHandler` | [`CaughtMiddlewareHandler`](README.md#caughtmiddlewarehandler)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:298](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L298)

___

### getConcurrencyMiddleware

▸ **getConcurrencyMiddleware**<`T`\>(`middlewares`): [`Middleware`](README.md#middleware)<`T`\>

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
| `middlewares` | [`Middleware`](README.md#middleware)<`T`\>[] |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:327](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L327)

___

### getEnforceMiddleware

▸ **getEnforceMiddleware**<`T`\>(`beforeMiddleware`, `middleware`, `afterMiddleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `beforeMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |
| `middleware` | [`Middleware`](README.md#middleware)<`T`\> |
| `afterMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:245](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L245)

___

### getFilterMiddleware

▸ **getFilterMiddleware**<`T`\>(`condition`, `filterMiddleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `condition` | [`BranchMiddlewareCondition`](README.md#branchmiddlewarecondition)<`T`\> |
| `filterMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:170](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L170)

___

### getForkMiddleware

▸ **getForkMiddleware**<`T`\>(`middleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `middleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:85](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L85)

___

### getLazyMiddleware

▸ **getLazyMiddleware**<`T`\>(`factory`): [`Middleware`](README.md#middleware)<`T`\>

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
| `factory` | [`LazyMiddlewareFactory`](README.md#lazymiddlewarefactory)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:43](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L43)

___

### getOptionalMiddleware

▸ **getOptionalMiddleware**<`T`\>(`condition`, `optionalMiddleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `condition` | [`BranchMiddlewareCondition`](README.md#branchmiddlewarecondition)<`T`\> |
| `optionalMiddleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:147](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L147)

___

### getTapMiddleware

▸ **getTapMiddleware**<`T`\>(`middleware`): [`Middleware`](README.md#middleware)<`T`\>

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
| `middleware` | [`Middleware`](README.md#middleware)<`T`\> |

#### Returns

[`Middleware`](README.md#middleware)<`T`\>

#### Defined in

[snippets.ts:66](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L66)

___

### noopNext

▸ **noopNext**(): `Promise`<`unknown`\>

Noop for call `next()` in middleware

#### Returns

`Promise`<`unknown`\>

#### Defined in

[types.ts:9](https://github.com/negezor/middleware-io/blob/62c3dac/src/types.ts#L9)

___

### skipMiddleware

▸ **skipMiddleware**<`T`\>(`context`, `next`): `Promise`<`unknown`\>

Call `next()` in middleware

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |
| `next` | [`NextMiddleware`](README.md#nextmiddleware) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[snippets.ts:17](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L17)

___

### stopMiddleware

▸ **stopMiddleware**<`T`\>(`context`, `next`): `Promise`<`void`\>

Does not call `next()` in middleware

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `T` |
| `next` | [`NextMiddleware`](README.md#nextmiddleware) |

#### Returns

`Promise`<`void`\>

#### Defined in

[snippets.ts:26](https://github.com/negezor/middleware-io/blob/62c3dac/src/snippets.ts#L26)
