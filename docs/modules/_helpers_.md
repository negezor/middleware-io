[middleware-io](../README.md) › ["helpers"](_helpers_.md)

# External module: "helpers"

## Index

### Functions

* [assertMiddleware](_helpers_.md#assertmiddleware)
* [assertMiddlewares](_helpers_.md#assertmiddlewares)
* [noopNext](_helpers_.md#const-noopnext)
* [wrapMiddlewareNextCall](_helpers_.md#const-wrapmiddlewarenextcall)

## Functions

###  assertMiddleware

▸ **assertMiddleware**<**T**>(`middleware`: unknown): *asserts middleware is Middleware<T>*

*Defined in [helpers.ts:3](https://github.com/negezor/middleware-io/blob/40848e4/src/helpers.ts#L3)*

**Type parameters:**

▪ **T**: *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | unknown |

**Returns:** *asserts middleware is Middleware<T>*

___

###  assertMiddlewares

▸ **assertMiddlewares**<**T**>(`middlewares`: unknown[]): *asserts middlewares is Middleware<T>[]*

*Defined in [helpers.ts:11](https://github.com/negezor/middleware-io/blob/40848e4/src/helpers.ts#L11)*

**Type parameters:**

▪ **T**: *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`middlewares` | unknown[] |

**Returns:** *asserts middlewares is Middleware<T>[]*

___

### `Const` noopNext

▸ **noopNext**(): *Promise‹void›*

*Defined in [helpers.ts:38](https://github.com/negezor/middleware-io/blob/40848e4/src/helpers.ts#L38)*

Noop for call `next()` in middleware

**Returns:** *Promise‹void›*

___

### `Const` wrapMiddlewareNextCall

▸ **wrapMiddlewareNextCall**<**T**>(`context`: T, `middleware`: [Middleware](_types_.md#middleware)‹T›): *Promise‹boolean›*

*Defined in [helpers.ts:17](https://github.com/negezor/middleware-io/blob/40848e4/src/helpers.ts#L17)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |
`middleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *Promise‹boolean›*
