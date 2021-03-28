[middleware-io](../README.md) / helpers

# Module: helpers

## Table of contents

### Functions

- [assertMiddleware](helpers.md#assertmiddleware)
- [assertMiddlewares](helpers.md#assertmiddlewares)
- [noopNext](helpers.md#noopnext)
- [wrapMiddlewareNextCall](helpers.md#wrapmiddlewarenextcall)

## Functions

### assertMiddleware

▸ **assertMiddleware**<T\>(`middleware`: *unknown*): asserts middleware is Middleware<T\>

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | *unknown* |

**Returns:** asserts middleware is Middleware<T\>

Defined in: [helpers.ts:3](https://github.com/negezor/middleware-io/blob/2437d40/src/helpers.ts#L3)

___

### assertMiddlewares

▸ **assertMiddlewares**<T\>(`middlewares`: *unknown*[]): asserts middlewares is Middleware<T\>[]

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | *unknown* |

#### Parameters:

Name | Type |
:------ | :------ |
`middlewares` | *unknown*[] |

**Returns:** asserts middlewares is Middleware<T\>[]

Defined in: [helpers.ts:11](https://github.com/negezor/middleware-io/blob/2437d40/src/helpers.ts#L11)

___

### noopNext

▸ `Const`**noopNext**(): *Promise*<unknown\>

Noop for call `next()` in middleware

**Returns:** *Promise*<unknown\>

Defined in: [helpers.ts:38](https://github.com/negezor/middleware-io/blob/2437d40/src/helpers.ts#L38)

___

### wrapMiddlewareNextCall

▸ `Const`**wrapMiddlewareNextCall**<T\>(`context`: T, `middleware`: [*Middleware*](types.md#middleware)<T\>): *Promise*<boolean\>

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`context` | T |
`middleware` | [*Middleware*](types.md#middleware)<T\> |

**Returns:** *Promise*<boolean\>

Defined in: [helpers.ts:17](https://github.com/negezor/middleware-io/blob/2437d40/src/helpers.ts#L17)
