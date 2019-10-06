[middleware-io](../README.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Type aliases

* [BranchMiddlewareCondition](_types_.md#branchmiddlewarecondition)
* [BranchMiddlewareConditionFunction](_types_.md#branchmiddlewareconditionfunction)
* [CaughtMiddlewareHandler](_types_.md#caughtmiddlewarehandler)
* [LazyMiddlewareFactory](_types_.md#lazymiddlewarefactory)
* [Middleware](_types_.md#middleware)
* [MiddlewareReturn](_types_.md#middlewarereturn)
* [NextMiddleware](_types_.md#nextmiddleware)
* [NextMiddlewareReturn](_types_.md#nextmiddlewarereturn)

## Type aliases

###  BranchMiddlewareCondition

Ƭ **BranchMiddlewareCondition**: *[BranchMiddlewareConditionFunction](_types_.md#branchmiddlewareconditionfunction)‹T› | boolean*

*Defined in [types.ts:31](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L31)*

Possible types for branch condition

___

###  BranchMiddlewareConditionFunction

Ƭ **BranchMiddlewareConditionFunction**: *function*

*Defined in [types.ts:26](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L26)*

Asynchronous function for branch condition

#### Type declaration:

▸ (`context`: T): *Promise‹boolean› | boolean*

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |

___

###  CaughtMiddlewareHandler

Ƭ **CaughtMiddlewareHandler**: *function*

*Defined in [types.ts:41](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L41)*

Handler for catching errors in middleware chains

#### Type declaration:

▸ (`context`: T, `error`: Error): *[MiddlewareReturn](_types_.md#middlewarereturn)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |
`error` | Error |

___

###  LazyMiddlewareFactory

Ƭ **LazyMiddlewareFactory**: *function*

*Defined in [types.ts:36](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L36)*

Asynchronous factory to create middleware

#### Type declaration:

▸ (`context`: T): *Promise‹[Middleware](_types_.md#middleware)‹T›› | [Middleware](_types_.md#middleware)‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |

___

###  Middleware

Ƭ **Middleware**: *function*

*Defined in [types.ts:21](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L21)*

Basic middleware

#### Type declaration:

▸ (`context`: T, `next`: [NextMiddleware](_types_.md#nextmiddleware)): *[MiddlewareReturn](_types_.md#middlewarereturn)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |
`next` | [NextMiddleware](_types_.md#nextmiddleware) |

___

###  MiddlewareReturn

Ƭ **MiddlewareReturn**: *any*

*Defined in [types.ts:16](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L16)*

Returns the type of response middleware

___

###  NextMiddleware

Ƭ **NextMiddleware**: *function*

*Defined in [types.ts:10](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L10)*

Call the next middleware from the chain

#### Type declaration:

▸ (): *Promise‹[NextMiddlewareReturn](_types_.md#nextmiddlewarereturn)›*

___

###  NextMiddlewareReturn

Ƭ **NextMiddlewareReturn**: *any*

*Defined in [types.ts:5](https://github.com/negezor/middleware-io/blob/c808840/src/types.ts#L5)*

Returns the type of response middleware
