[middleware-io - v2.2.0](../README.md) › ["composer"](../modules/_composer_.md) › [Composer](_composer_.composer.md)

# Class: Composer <**T**>

A simple middleware compose builder

## Type parameters

▪ **T**

## Hierarchy

* **Composer**

## Index

### Properties

* [middlewares](_composer_.composer.md#protected-middlewares)

### Methods

* [after](_composer_.composer.md#after)
* [before](_composer_.composer.md#before)
* [branch](_composer_.composer.md#branch)
* [caught](_composer_.composer.md#caught)
* [clone](_composer_.composer.md#clone)
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

• **middlewares**: *[Middleware](../modules/_types_.md#middleware)‹T›[]* =  []

*Defined in [composer.ts:30](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L30)*

## Methods

###  after

▸ **after**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T›, `afterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:154](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L154)*

Runs the second middleware after the main

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T› |
`afterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  before

▸ **before**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T›, `beforeMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:139](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L139)*

Runs the second middleware before the main

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T› |
`beforeMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  branch

▸ **branch**(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T›, `trueMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›, `falseMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:90](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L90)*

By condition splits the middleware

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T› |
`trueMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |
`falseMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  caught

▸ **caught**(`errorHandler`: [CaughtMiddlewareHandler](../modules/_types_.md#caughtmiddlewarehandler)‹T›): *this*

*Defined in [composer.ts:186](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L186)*

Catches errors in the middleware chain

**Parameters:**

Name | Type |
------ | ------ |
`errorHandler` | [CaughtMiddlewareHandler](../modules/_types_.md#caughtmiddlewarehandler)‹T› |

**Returns:** *this*

___

###  clone

▸ **clone**(): *[Composer](_composer_.composer.md)‹T›*

*Defined in [composer.ts:35](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L35)*

Clones a composer object

**Returns:** *[Composer](_composer_.composer.md)‹T›*

___

###  compose

▸ **compose**(): *[Middleware](../modules/_types_.md#middleware)‹T›*

*Defined in [composer.ts:211](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L211)*

Compose middleware handlers into a single handler

**Returns:** *[Middleware](../modules/_types_.md#middleware)‹T›*

___

###  concurrency

▸ **concurrency**(`middlewares`: [Middleware](../modules/_types_.md#middleware)‹T›[]): *this*

*Defined in [composer.ts:198](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L198)*

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

**Parameters:**

Name | Type |
------ | ------ |
`middlewares` | [Middleware](../modules/_types_.md#middleware)‹T›[] |

**Returns:** *this*

___

###  enforce

▸ **enforce**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T›, `beforeMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›, `afterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:169](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L169)*

Runs middleware before and after the main

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T› |
`beforeMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |
`afterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  filter

▸ **filter**(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T›, `filterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:124](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L124)*

Conditionally runs middleware or stops the chain

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T› |
`filterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  fork

▸ **fork**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:79](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L79)*

Runs the middleware at the next event loop and force call `next()`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  lazy

▸ **lazy**(`factory`: [LazyMiddlewareFactory](../modules/_types_.md#lazymiddlewarefactory)‹T›): *this*

*Defined in [composer.ts:57](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L57)*

Lazily asynchronously gets middleware

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [LazyMiddlewareFactory](../modules/_types_.md#lazymiddlewarefactory)‹T› |

**Returns:** *this*

___

###  optional

▸ **optional**(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T›, `optionalMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:109](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L109)*

Conditionally runs optional middleware or skips middleware

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T› |
`optionalMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  tap

▸ **tap**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:68](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L68)*

Runs the middleware and force call `next()`

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*

___

###  use

▸ **use**(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T›): *this*

*Defined in [composer.ts:46](https://github.com/negezor/middleware-io/blob/32e2b26/src/composer.ts#L46)*

Adds middleware to the chain

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T› |

**Returns:** *this*
