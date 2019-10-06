[middleware-io](../README.md) › ["helpers"](_helpers_.md)

# External module: "helpers"

## Index

### Functions

* [assertMiddleware](_helpers_.md#const-assertmiddleware)
* [assertMiddlewares](_helpers_.md#const-assertmiddlewares)
* [noopNext](_helpers_.md#const-noopnext)
* [wrapMiddlewareNextCall](_helpers_.md#const-wrapmiddlewarenextcall)

## Functions

### `Const` assertMiddleware

▸ **assertMiddleware**(`middleware`: Function): *void*

*Defined in [helpers.ts:3](https://github.com/negezor/middleware-io/blob/c808840/src/helpers.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | Function |

**Returns:** *void*

___

### `Const` assertMiddlewares

▸ **assertMiddlewares**(`middlewares`: Function[]): *void*

*Defined in [helpers.ts:9](https://github.com/negezor/middleware-io/blob/c808840/src/helpers.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`middlewares` | Function[] |

**Returns:** *void*

___

### `Const` noopNext

▸ **noopNext**(): *Promise‹void›*

*Defined in [helpers.ts:29](https://github.com/negezor/middleware-io/blob/c808840/src/helpers.ts#L29)*

Noop for call `next()` in middleware

**Returns:** *Promise‹void›*

___

### `Const` wrapMiddlewareNextCall

▸ **wrapMiddlewareNextCall**<**T**>(`context`: T, `middleware`: [Middleware](_types_.md#middleware)‹T›): *Promise‹boolean›*

*Defined in [helpers.ts:13](https://github.com/negezor/middleware-io/blob/c808840/src/helpers.ts#L13)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |
`middleware` | [Middleware](_types_.md#middleware)‹T› |

**Returns:** *Promise‹boolean›*
