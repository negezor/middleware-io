[middleware-io](../README.md) / types

# Module: types

## Table of contents

### Type aliases

- [BranchMiddlewareCondition](types.md#branchmiddlewarecondition)
- [BranchMiddlewareConditionFunction](types.md#branchmiddlewareconditionfunction)
- [CaughtMiddlewareHandler](types.md#caughtmiddlewarehandler)
- [LazyMiddlewareFactory](types.md#lazymiddlewarefactory)
- [Middleware](types.md#middleware)
- [MiddlewareReturn](types.md#middlewarereturn)
- [NextMiddleware](types.md#nextmiddleware)
- [NextMiddlewareReturn](types.md#nextmiddlewarereturn)
- [UnknownObject](types.md#unknownobject)

## Type aliases

### BranchMiddlewareCondition

Ƭ **BranchMiddlewareCondition**<T\>: [*BranchMiddlewareConditionFunction*](types.md#branchmiddlewareconditionfunction)<T\> \| *boolean*

Possible types for branch condition

#### Type parameters:

Name |
:------ |
`T` |

Defined in: [types.ts:34](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L34)

___

### BranchMiddlewareConditionFunction

Ƭ **BranchMiddlewareConditionFunction**<T\>: (`context`: T) => *Promise*<boolean\> \| *boolean*

Asynchronous function for branch condition

#### Type parameters:

Name |
:------ |
`T` |

#### Type declaration:

▸ (`context`: T): *Promise*<boolean\> \| *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`context` | T |

**Returns:** *Promise*<boolean\> \| *boolean*

Defined in: [types.ts:29](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L29)

___

### CaughtMiddlewareHandler

Ƭ **CaughtMiddlewareHandler**<T\>: (`context`: T, `error`: Error) => [*MiddlewareReturn*](types.md#middlewarereturn)

Handler for catching errors in middleware chains

#### Type parameters:

Name |
:------ |
`T` |

#### Type declaration:

▸ (`context`: T, `error`: Error): [*MiddlewareReturn*](types.md#middlewarereturn)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | T |
`error` | Error |

**Returns:** [*MiddlewareReturn*](types.md#middlewarereturn)

Defined in: [types.ts:44](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L44)

___

### LazyMiddlewareFactory

Ƭ **LazyMiddlewareFactory**<T\>: (`context`: T) => *Promise*<[*Middleware*](types.md#middleware)<T\>\> \| [*Middleware*](types.md#middleware)<T\>

Asynchronous factory to create middleware

#### Type parameters:

Name |
:------ |
`T` |

#### Type declaration:

▸ (`context`: T): *Promise*<[*Middleware*](types.md#middleware)<T\>\> \| [*Middleware*](types.md#middleware)<T\>

#### Parameters:

Name | Type |
:------ | :------ |
`context` | T |

**Returns:** *Promise*<[*Middleware*](types.md#middleware)<T\>\> \| [*Middleware*](types.md#middleware)<T\>

Defined in: [types.ts:39](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L39)

___

### Middleware

Ƭ **Middleware**<T\>: (`context`: T, `next`: [*NextMiddleware*](types.md#nextmiddleware)) => [*MiddlewareReturn*](types.md#middlewarereturn)

Basic middleware

#### Type parameters:

Name |
:------ |
`T` |

#### Type declaration:

▸ (`context`: T, `next`: [*NextMiddleware*](types.md#nextmiddleware)): [*MiddlewareReturn*](types.md#middlewarereturn)

#### Parameters:

Name | Type |
:------ | :------ |
`context` | T |
`next` | [*NextMiddleware*](types.md#nextmiddleware) |

**Returns:** [*MiddlewareReturn*](types.md#middlewarereturn)

Defined in: [types.ts:24](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L24)

___

### MiddlewareReturn

Ƭ **MiddlewareReturn**: *unknown*

Returns the type of response middleware

Defined in: [types.ts:14](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L14)

___

### NextMiddleware

Ƭ **NextMiddleware**: () => *Promise*<[*NextMiddlewareReturn*](types.md#nextmiddlewarereturn)\>

Call the next middleware from the chain

#### Type declaration:

▸ (): *Promise*<[*NextMiddlewareReturn*](types.md#nextmiddlewarereturn)\>

**Returns:** *Promise*<[*NextMiddlewareReturn*](types.md#nextmiddlewarereturn)\>

Defined in: [types.ts:9](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L9)

___

### NextMiddlewareReturn

Ƭ **NextMiddlewareReturn**: *unknown*

Returns the type of response middleware

Defined in: [types.ts:4](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L4)

___

### UnknownObject

Ƭ **UnknownObject**: *Record*<string, unknown\>

Instead of object

Defined in: [types.ts:19](https://github.com/negezor/middleware-io/blob/2437d40/src/types.ts#L19)
