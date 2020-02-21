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

*Defined in [types.ts:29](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L29)*

Possible types for branch condition

___

###  BranchMiddlewareConditionFunction

Ƭ **BranchMiddlewareConditionFunction**: *function*

*Defined in [types.ts:24](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L24)*

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

*Defined in [types.ts:39](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L39)*

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

*Defined in [types.ts:34](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L34)*

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

*Defined in [types.ts:19](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L19)*

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

Ƭ **MiddlewareReturn**: *unknown*

*Defined in [types.ts:14](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L14)*

Returns the type of response middleware

___

###  NextMiddleware

Ƭ **NextMiddleware**: *function*

*Defined in [types.ts:9](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L9)*

Call the next middleware from the chain

#### Type declaration:

▸ (): *Promise‹[NextMiddlewareReturn](_types_.md#nextmiddlewarereturn)›*

___

###  NextMiddlewareReturn

Ƭ **NextMiddlewareReturn**: *unknown*

*Defined in [types.ts:4](https://github.com/negezor/middleware-io/blob/40848e4/src/types.ts#L4)*

Returns the type of response middleware
