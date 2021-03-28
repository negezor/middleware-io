[middleware-io](../README.md) / [composer](../modules/composer.md) / Composer

# Class: Composer<T, R\>

[composer](../modules/composer.md).Composer

A simple middleware compose builder

## Type parameters

Name | Type | Default |
:------ | :------ | :------ |
`T` | [*UnknownObject*](../modules/types.md#unknownobject) | - |
`R` | - | T |

## Table of contents

### Constructors

- [constructor](composer.composer-1.md#constructor)

### Properties

- [middlewares](composer.composer-1.md#middlewares)

### Accessors

- [length](composer.composer-1.md#length)

### Methods

- [after](composer.composer-1.md#after)
- [before](composer.composer-1.md#before)
- [branch](composer.composer-1.md#branch)
- [caught](composer.composer-1.md#caught)
- [clone](composer.composer-1.md#clone)
- [compose](composer.composer-1.md#compose)
- [concurrency](composer.composer-1.md#concurrency)
- [enforce](composer.composer-1.md#enforce)
- [filter](composer.composer-1.md#filter)
- [fork](composer.composer-1.md#fork)
- [lazy](composer.composer-1.md#lazy)
- [optional](composer.composer-1.md#optional)
- [tap](composer.composer-1.md#tap)
- [use](composer.composer-1.md#use)
- [builder](composer.composer-1.md#builder)

## Constructors

### constructor

\+ **new Composer**<T, R\>(): [*Composer*](composer.composer-1.md)<T, R\>

#### Type parameters:

Name | Type | Default |
:------ | :------ | :------ |
`T` | [*UnknownObject*](../modules/types.md#unknownobject) | - |
`R` | - | T |

**Returns:** [*Composer*](composer.composer-1.md)<T, R\>

## Properties

### middlewares

• `Protected` **middlewares**: [*Middleware*](../modules/types.md#middleware)<R\>[]

Defined in: [composer.ts:31](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L31)

## Accessors

### length

• get **length**(): *number*

The number of middleware installed in Composer

**Returns:** *number*

Defined in: [composer.ts:43](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L43)

## Methods

### after

▸ **after**<V\>(`middleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>, `afterMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Runs the second middleware after the main

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |
`afterMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:169](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L169)

___

### before

▸ **before**<V\>(`beforeMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>, `middleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Runs the second middleware before the main

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`beforeMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |
`middleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:154](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L154)

___

### branch

▸ **branch**<V\>(`condition`: [*BranchMiddlewareCondition*](../modules/types.md#branchmiddlewarecondition)<T & V\>, `trueMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>, `falseMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

By condition splits the middleware

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`condition` | [*BranchMiddlewareCondition*](../modules/types.md#branchmiddlewarecondition)<T & V\> |
`trueMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |
`falseMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:105](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L105)

___

### caught

▸ **caught**<V\>(`errorHandler`: [*CaughtMiddlewareHandler*](../modules/types.md#caughtmiddlewarehandler)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Catches errors in the middleware chain

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`errorHandler` | [*CaughtMiddlewareHandler*](../modules/types.md#caughtmiddlewarehandler)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:201](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L201)

___

### clone

▸ **clone**(): [*Composer*](composer.composer-1.md)<T, R\>

Clones a composer object

**Returns:** [*Composer*](composer.composer-1.md)<T, R\>

Defined in: [composer.ts:50](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L50)

___

### compose

▸ **compose**(): [*Middleware*](../modules/types.md#middleware)<R\>

Compose middleware handlers into a single handler

**Returns:** [*Middleware*](../modules/types.md#middleware)<R\>

Defined in: [composer.ts:228](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L228)

___

### concurrency

▸ **concurrency**<V\>(`middlewares`: [*Middleware*](../modules/types.md#middleware)<T & V\>[]): [*Composer*](composer.composer-1.md)<T & V, R\>

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`middlewares` | [*Middleware*](../modules/types.md#middleware)<T & V\>[] |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:215](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L215)

___

### enforce

▸ **enforce**<V\>(`beforeMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>, `middleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>, `afterMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Runs middleware before and after the main

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`beforeMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |
`middleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |
`afterMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:184](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L184)

___

### filter

▸ **filter**<V\>(`condition`: [*BranchMiddlewareCondition*](../modules/types.md#branchmiddlewarecondition)<T & V\>, `filterMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Conditionally runs middleware or stops the chain

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`condition` | [*BranchMiddlewareCondition*](../modules/types.md#branchmiddlewarecondition)<T & V\> |
`filterMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:139](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L139)

___

### fork

▸ **fork**<V\>(`middleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Runs the middleware at the next event loop and force call `next()`

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:94](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L94)

___

### lazy

▸ **lazy**<V\>(`factory`: [*LazyMiddlewareFactory*](../modules/types.md#lazymiddlewarefactory)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Lazily asynchronously gets middleware

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`factory` | [*LazyMiddlewareFactory*](../modules/types.md#lazymiddlewarefactory)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:72](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L72)

___

### optional

▸ **optional**<V\>(`condition`: [*BranchMiddlewareCondition*](../modules/types.md#branchmiddlewarecondition)<T & V\>, `optionalMiddleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Conditionally runs optional middleware or skips middleware

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`condition` | [*BranchMiddlewareCondition*](../modules/types.md#branchmiddlewarecondition)<T & V\> |
`optionalMiddleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:124](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L124)

___

### tap

▸ **tap**<V\>(`middleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Runs the middleware and force call `next()`

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:83](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L83)

___

### use

▸ **use**<V\>(`middleware`: [*Middleware*](../modules/types.md#middleware)<T & V\>): [*Composer*](composer.composer-1.md)<T & V, R\>

Adds middleware to the chain

#### Type parameters:

Name | Default |
:------ | :------ |
`V` | [*UnknownObject*](../modules/types.md#unknownobject) |

#### Parameters:

Name | Type |
:------ | :------ |
`middleware` | [*Middleware*](../modules/types.md#middleware)<T & V\> |

**Returns:** [*Composer*](composer.composer-1.md)<T & V, R\>

Defined in: [composer.ts:61](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L61)

___

### builder

▸ `Static`**builder**<Context\>(): [*Composer*](composer.composer-1.md)<Context, Context\>

Invokes a new instance of the Composer class

#### Type parameters:

Name | Type |
:------ | :------ |
`Context` | [*UnknownObject*](../modules/types.md#unknownobject) |

**Returns:** [*Composer*](composer.composer-1.md)<Context, Context\>

Defined in: [composer.ts:36](https://github.com/negezor/middleware-io/blob/2437d40/src/composer.ts#L36)
