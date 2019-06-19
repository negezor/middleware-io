> ## [middleware-io](../README.md)

["types"](_types_.md) /

# External module: "types"

### Index

#### Type aliases

* [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)
* [BranchMiddlewareConditionFunction](_types_.md#branchmiddlewareconditionfunction)
* [LazyMiddlewareFactory](_types_.md#lazymiddlewarefactory)
* [Middleware](_types_.md#middleware)
* [MiddlewareReturn](_types_.md#middlewarereturn)
* [NextMiddleware](_types_.md#nextmiddleware)
* [NextMiddlewareReturn](_types_.md#nextmiddlewarereturn)

## Type aliases

###  BranchMiddlewareCondition

Ƭ **BranchMiddlewareCondition**: *[BranchMiddlewareConditionFunction](_types_.md#branchmiddlewareconditionfunction)‹*`T`*› | boolean*

*Defined in [types.ts:31](url)*

Possible types for branch condition

___

###  BranchMiddlewareConditionFunction

Ƭ **BranchMiddlewareConditionFunction**: *function*

*Defined in [types.ts:26](url)*

Asynchronous function for branch condition

#### Type declaration:

▸ (`context`: `T`): *`Promise<boolean>` | boolean*

**Parameters:**

Name | Type |
------ | ------ |
`context` | `T` |

___

###  LazyMiddlewareFactory

Ƭ **LazyMiddlewareFactory**: *function*

*Defined in [types.ts:36](url)*

Asynchronous factory to create middleware

#### Type declaration:

▸ (`context`: `T`): *`Promise<Middleware<T>>` | [Middleware](_types_.md#middleware)‹*`T`*›*

**Parameters:**

Name | Type |
------ | ------ |
`context` | `T` |

___

###  Middleware

Ƭ **Middleware**: *function*

*Defined in [types.ts:21](url)*

Basic middleware

#### Type declaration:

▸ (`context`: `T`, `next`: [NextMiddleware](_types_.md#nextmiddleware)): *[MiddlewareReturn](_types_.md#middlewarereturn)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | `T` |
`next` | [NextMiddleware](_types_.md#nextmiddleware) |

___

###  MiddlewareReturn

Ƭ **MiddlewareReturn**: *any*

*Defined in [types.ts:16](url)*

Returns the type of response middleware

___

###  NextMiddleware

Ƭ **NextMiddleware**: *function*

*Defined in [types.ts:10](url)*

Call the next middleware from the chain

#### Type declaration:

▸ (): *`Promise<NextMiddlewareReturn>`*

___

###  NextMiddlewareReturn

Ƭ **NextMiddlewareReturn**: *any*

*Defined in [types.ts:5](url)*

Returns the type of response middleware

___