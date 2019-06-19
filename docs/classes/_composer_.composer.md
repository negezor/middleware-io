> ## [middleware-io](../README.md)

["composer"](../modules/_composer_.md) / [Composer](_composer_.composer.md) /

# Class: Composer <**T**>

A simple middleware compose builder

## Type parameters

■` T`

## Hierarchy

* **Composer**

### Index

#### Properties

* [middlewares](_composer_.composer.md#protected-middlewares)

#### Methods

* [after](_composer_.composer.md#after)
* [before](_composer_.composer.md#before)
* [branch](_composer_.composer.md#branch)
* [compose](_composer_.composer.md#compose)
* [concurrency](_composer_.composer.md#concurrency)
* [enforce](_composer_.composer.md#enforce)
* [filter](_composer_.composer.md#filter)
* [fork](_composer_.composer.md#fork)
* [lazy](_composer_.composer.md#lazy)
* [optional](_composer_.composer.md#optional)
* [tap](_composer_.composer.md#tap)
* [use](_composer_.composer.md#use)

## Properties

### `Protected` middlewares

● **middlewares**: *[Middleware](../modules/_types_.md#middleware)‹*`T`*›[]* =  []

*Defined in [composer.ts:21](url)*

___

## Methods

###  after

▸ **after**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›, `afterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:132](url)*

Runs the second middleware after the main

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |
`afterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  before

▸ **before**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›, `beforeMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:117](url)*

Runs the second middleware before the main

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |
`beforeMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  branch

▸ **branch**(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹*`T`*›, `trueMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›, `falseMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:68](url)*

By condition splits the middleware

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹*`T`*› |
`trueMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |
`falseMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  compose

▸ **compose**(): *[Middleware](../modules/_types_.md#middleware)‹*`T`*›*

*Defined in [composer.ts:178](url)*

Compose middleware handlers into a single handler

**Returns:** *[Middleware](../modules/_types_.md#middleware)‹*`T`*›*

___

###  concurrency

▸ **concurrency**(`middlewares`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›[]): *this*

*Defined in [composer.ts:165](url)*

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

**Parameters:**

Name | Type |
------ | ------ |
`middlewares` | [Middleware](../modules/_types_.md#middleware)‹*`T`*›[] |

**Returns:** *this*

___

###  enforce

▸ **enforce**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›, `beforeMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›, `afterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:147](url)*

Runs middleware before and after the main

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |
`beforeMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |
`afterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  filter

▸ **filter**(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹*`T`*›, `filterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:102](url)*

Conditionally runs middleware or stops the chain

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹*`T`*› |
`filterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  fork

▸ **fork**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:57](url)*

Runs the middleware at the next event loop and force call `next()`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  lazy

▸ **lazy**(`factory`: [LazyMiddlewareFactory](../modules/_types_.md#lazymiddlewarefactory)‹*`T`*›): *this*

*Defined in [composer.ts:35](url)*

Lazily asynchronously gets middleware

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [LazyMiddlewareFactory](../modules/_types_.md#lazymiddlewarefactory)‹*`T`*› |

**Returns:** *this*

___

###  optional

▸ **optional**(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹*`T`*›, `optionalMiddleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:87](url)*

Conditionally runs optional middleware or skips middleware

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹*`T`*› |
`optionalMiddleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  tap

▸ **tap**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:46](url)*

Runs the middleware and force call `next()`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___

###  use

▸ **use**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹*`T`*›): *this*

*Defined in [composer.ts:26](url)*

Adds middleware to the chain

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹*`T`*› |

**Returns:** *this*

___