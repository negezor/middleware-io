[middleware-io](../README.md) / Composer

# Class: Composer\<T, R\>

A simple middleware compose builder

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`UnknownObject`](../README.md#unknownobject) |
| `R` | `T` |

## Table of contents

### Constructors

- [constructor](Composer.md#constructor)

### Properties

- [middlewares](Composer.md#middlewares)

### Accessors

- [length](Composer.md#length)

### Methods

- [after](Composer.md#after)
- [before](Composer.md#before)
- [branch](Composer.md#branch)
- [caught](Composer.md#caught)
- [clone](Composer.md#clone)
- [compose](Composer.md#compose)
- [concurrency](Composer.md#concurrency)
- [enforce](Composer.md#enforce)
- [filter](Composer.md#filter)
- [fork](Composer.md#fork)
- [lazy](Composer.md#lazy)
- [optional](Composer.md#optional)
- [tap](Composer.md#tap)
- [use](Composer.md#use)
- [builder](Composer.md#builder)

## Constructors

### constructor

• **new Composer**\<`T`, `R`\>(): [`Composer`](Composer.md)\<`T`, `R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`UnknownObject`](../README.md#unknownobject) |
| `R` | `T` |

#### Returns

[`Composer`](Composer.md)\<`T`, `R`\>

## Properties

### middlewares

• `Protected` **middlewares**: [`Middleware`](../README.md#middleware)\<`R`\>[] = `[]`

#### Defined in

[composer.ts:30](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L30)

## Accessors

### length

• `get` **length**(): `number`

The number of middleware installed in Composer

#### Returns

`number`

#### Defined in

[composer.ts:42](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L42)

## Methods

### after

▸ **after**\<`V`\>(`middleware`, `afterMiddleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Runs the second middleware after the main

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |
| `afterMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:141](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L141)

___

### before

▸ **before**\<`V`\>(`beforeMiddleware`, `middleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Runs the second middleware before the main

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `beforeMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |
| `middleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:131](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L131)

___

### branch

▸ **branch**\<`V`\>(`condition`, `trueMiddleware`, `falseMiddleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

By condition splits the middleware

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`BranchMiddlewareCondition`](../README.md#branchmiddlewarecondition)\<`T` & `V`\> |
| `trueMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |
| `falseMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:92](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L92)

___

### caught

▸ **caught**\<`V`\>(`errorHandler`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Catches errors in the middleware chain

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorHandler` | [`CaughtMiddlewareHandler`](../README.md#caughtmiddlewarehandler)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:162](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L162)

___

### clone

▸ **clone**(): [`Composer`](Composer.md)\<`T`, `R`\>

Clones a composer object

#### Returns

[`Composer`](Composer.md)\<`T`, `R`\>

#### Defined in

[composer.ts:49](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L49)

___

### compose

▸ **compose**(): [`Middleware`](../README.md#middleware)\<`R`\>

Compose middleware handlers into a single handler

#### Returns

[`Middleware`](../README.md#middleware)\<`R`\>

#### Defined in

[composer.ts:177](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L177)

___

### concurrency

▸ **concurrency**\<`V`\>(`middlewares`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middlewares` | [`Middleware`](../README.md#middleware)\<`T` & `V`\>[] |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:170](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L170)

___

### enforce

▸ **enforce**\<`V`\>(`beforeMiddleware`, `middleware`, `afterMiddleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Runs middleware before and after the main

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `beforeMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |
| `middleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |
| `afterMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:151](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L151)

___

### filter

▸ **filter**\<`V`\>(`condition`, `filterMiddleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Conditionally runs middleware or stops the chain

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`BranchMiddlewareCondition`](../README.md#branchmiddlewarecondition)\<`T` & `V`\> |
| `filterMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:121](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L121)

___

### fork

▸ **fork**\<`V`\>(`middleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Runs the middleware at the next event loop and force call `next()`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:85](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L85)

___

### lazy

▸ **lazy**\<`V`\>(`factory`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Lazily asynchronously gets middleware

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | [`LazyMiddlewareFactory`](../README.md#lazymiddlewarefactory)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:71](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L71)

___

### optional

▸ **optional**\<`V`\>(`condition`, `optionalMiddleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Conditionally runs optional middleware or skips middleware

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`BranchMiddlewareCondition`](../README.md#branchmiddlewarecondition)\<`T` & `V`\> |
| `optionalMiddleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:111](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L111)

___

### tap

▸ **tap**\<`V`\>(`middleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Runs the middleware and force call `next()`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:78](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L78)

___

### use

▸ **use**\<`V`\>(`middleware`): [`Composer`](Composer.md)\<`T` & `V`, `R`\>

Adds middleware to the chain

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)\<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)\<`T` & `V`, `R`\>

#### Defined in

[composer.ts:60](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L60)

___

### builder

▸ **builder**\<`Context`\>(): [`Composer`](Composer.md)\<`Context`, `Context`\>

Invokes a new instance of the Composer class

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`UnknownObject`](../README.md#unknownobject) |

#### Returns

[`Composer`](Composer.md)\<`Context`, `Context`\>

#### Defined in

[composer.ts:35](https://github.com/negezor/middleware-io/blob/cfc102d315382709d9f9d43771812ee5ab488e62/src/composer.ts#L35)
