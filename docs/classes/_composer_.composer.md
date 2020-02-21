[middleware-io](../README.md) › ["composer"](../modules/_composer_.md) › [Composer](_composer_.composer.md)

# Class: Composer <**T, R**>

A simple middleware compose builder

## Type parameters

▪ **T**: *object*

▪ **R**

## Hierarchy

* **Composer**

## Index

### Properties

* [middlewares](_composer_.composer.md#protected-middlewares)

### Accessors

* [length](_composer_.composer.md#length)

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
* [builder](_composer_.composer.md#static-builder)

## Properties

### `Protected` middlewares

• **middlewares**: *[Middleware](../modules/_types_.md#middleware)‹R›[]* = []

*Defined in [composer.ts:30](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L30)*

## Accessors

###  length

• **get length**(): *number*

*Defined in [composer.ts:42](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L42)*

The number of middleware installed in Composer

**Returns:** *number*

## Methods

###  after

▸ **after**<**V**>(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›, `afterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:168](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L168)*

Runs the second middleware after the main

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |
`afterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  before

▸ **before**<**V**>(`beforeMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›, `middleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:153](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L153)*

Runs the second middleware before the main

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`beforeMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  branch

▸ **branch**<**V**>(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T & V›, `trueMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›, `falseMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:104](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L104)*

By condition splits the middleware

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T & V› |
`trueMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |
`falseMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  caught

▸ **caught**<**V**>(`errorHandler`: [CaughtMiddlewareHandler](../modules/_types_.md#caughtmiddlewarehandler)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:200](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L200)*

Catches errors in the middleware chain

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`errorHandler` | [CaughtMiddlewareHandler](../modules/_types_.md#caughtmiddlewarehandler)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  clone

▸ **clone**(): *[Composer](_composer_.composer.md)‹T, R›*

*Defined in [composer.ts:49](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L49)*

Clones a composer object

**Returns:** *[Composer](_composer_.composer.md)‹T, R›*

___

###  compose

▸ **compose**(): *[Middleware](../modules/_types_.md#middleware)‹R›*

*Defined in [composer.ts:225](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L225)*

Compose middleware handlers into a single handler

**Returns:** *[Middleware](../modules/_types_.md#middleware)‹R›*

___

###  concurrency

▸ **concurrency**<**V**>(`middlewares`: [Middleware](../modules/_types_.md#middleware)‹T & V›[]): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:212](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L212)*

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`middlewares` | [Middleware](../modules/_types_.md#middleware)‹T & V›[] |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  enforce

▸ **enforce**<**V**>(`beforeMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›, `middleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›, `afterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:183](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L183)*

Runs middleware before and after the main

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`beforeMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |
`afterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  filter

▸ **filter**<**V**>(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T & V›, `filterMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:138](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L138)*

Conditionally runs middleware or stops the chain

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T & V› |
`filterMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  fork

▸ **fork**<**V**>(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:93](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L93)*

Runs the middleware at the next event loop and force call `next()`

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  lazy

▸ **lazy**<**V**>(`factory`: [LazyMiddlewareFactory](../modules/_types_.md#lazymiddlewarefactory)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:71](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L71)*

Lazily asynchronously gets middleware

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`factory` | [LazyMiddlewareFactory](../modules/_types_.md#lazymiddlewarefactory)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  optional

▸ **optional**<**V**>(`condition`: [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T & V›, `optionalMiddleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:123](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L123)*

Conditionally runs optional middleware or skips middleware

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`condition` | [BranchMiddlewareCondition](../modules/_types_.md#branchmiddlewarecondition)‹T & V› |
`optionalMiddleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  tap

▸ **tap**<**V**>(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:82](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L82)*

Runs the middleware and force call `next()`

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

###  use

▸ **use**<**V**>(`middleware`: [Middleware](../modules/_types_.md#middleware)‹T & V›): *[Composer](_composer_.composer.md)‹T & V, R›*

*Defined in [composer.ts:60](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L60)*

Adds middleware to the chain

**Type parameters:**

▪ **V**

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [Middleware](../modules/_types_.md#middleware)‹T & V› |

**Returns:** *[Composer](_composer_.composer.md)‹T & V, R›*

___

### `Static` builder

▸ **builder**<**Context**>(): *[Composer](_composer_.composer.md)‹Context›*

*Defined in [composer.ts:35](https://github.com/negezor/middleware-io/blob/40848e4/src/composer.ts#L35)*

Invokes a new instance of the Composer class

**Type parameters:**

▪ **Context**: *object*

**Returns:** *[Composer](_composer_.composer.md)‹Context›*
