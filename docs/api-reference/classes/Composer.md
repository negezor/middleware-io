[middleware-io](../README.md) / Composer

# Class: Composer<T, R\>

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

• **new Composer**<`T`, `R`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`UnknownObject`](../README.md#unknownobject) |
| `R` | `T` |

## Properties

### middlewares

• `Protected` **middlewares**: [`Middleware`](../README.md#middleware)<`R`\>[] = `[]`

#### Defined in

[composer.ts:31](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L31)

## Accessors

### length

• `get` **length**(): `number`

The number of middleware installed in Composer

#### Returns

`number`

#### Defined in

[composer.ts:43](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L43)

## Methods

### after

▸ **after**<`V`\>(`middleware`, `afterMiddleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Runs the second middleware after the main

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |
| `afterMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:169](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L169)

___

### before

▸ **before**<`V`\>(`beforeMiddleware`, `middleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Runs the second middleware before the main

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `beforeMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |
| `middleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:154](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L154)

___

### branch

▸ **branch**<`V`\>(`condition`, `trueMiddleware`, `falseMiddleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

By condition splits the middleware

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`BranchMiddlewareCondition`](../README.md#branchmiddlewarecondition)<`T` & `V`\> |
| `trueMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |
| `falseMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:105](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L105)

___

### caught

▸ **caught**<`V`\>(`errorHandler`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Catches errors in the middleware chain

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorHandler` | [`CaughtMiddlewareHandler`](../README.md#caughtmiddlewarehandler)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:201](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L201)

___

### clone

▸ **clone**(): [`Composer`](Composer.md)<`T`, `R`\>

Clones a composer object

#### Returns

[`Composer`](Composer.md)<`T`, `R`\>

#### Defined in

[composer.ts:50](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L50)

___

### compose

▸ **compose**(): [`Middleware`](../README.md#middleware)<`R`\>

Compose middleware handlers into a single handler

#### Returns

[`Middleware`](../README.md#middleware)<`R`\>

#### Defined in

[composer.ts:228](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L228)

___

### concurrency

▸ **concurrency**<`V`\>(`middlewares`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Concurrently launches middleware,
the chain will continue if `next()` is called in all middlewares

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middlewares` | [`Middleware`](../README.md#middleware)<`T` & `V`\>[] |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:215](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L215)

___

### enforce

▸ **enforce**<`V`\>(`beforeMiddleware`, `middleware`, `afterMiddleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Runs middleware before and after the main

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `beforeMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |
| `middleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |
| `afterMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:184](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L184)

___

### filter

▸ **filter**<`V`\>(`condition`, `filterMiddleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Conditionally runs middleware or stops the chain

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`BranchMiddlewareCondition`](../README.md#branchmiddlewarecondition)<`T` & `V`\> |
| `filterMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:139](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L139)

___

### fork

▸ **fork**<`V`\>(`middleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Runs the middleware at the next event loop and force call `next()`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:94](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L94)

___

### lazy

▸ **lazy**<`V`\>(`factory`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Lazily asynchronously gets middleware

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | [`LazyMiddlewareFactory`](../README.md#lazymiddlewarefactory)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:72](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L72)

___

### optional

▸ **optional**<`V`\>(`condition`, `optionalMiddleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Conditionally runs optional middleware or skips middleware

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | [`BranchMiddlewareCondition`](../README.md#branchmiddlewarecondition)<`T` & `V`\> |
| `optionalMiddleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:124](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L124)

___

### tap

▸ **tap**<`V`\>(`middleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Runs the middleware and force call `next()`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:83](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L83)

___

### use

▸ **use**<`V`\>(`middleware`): [`Composer`](Composer.md)<`T` & `V`, `R`\>

Adds middleware to the chain

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | [`UnknownObject`](../README.md#unknownobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | [`Middleware`](../README.md#middleware)<`T` & `V`\> |

#### Returns

[`Composer`](Composer.md)<`T` & `V`, `R`\>

#### Defined in

[composer.ts:61](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L61)

___

### builder

▸ `Static` **builder**<`Context`\>(): [`Composer`](Composer.md)<`Context`, `Context`\>

Invokes a new instance of the Composer class

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Context` | extends [`UnknownObject`](../README.md#unknownobject) |

#### Returns

[`Composer`](Composer.md)<`Context`, `Context`\>

#### Defined in

[composer.ts:36](https://github.com/negezor/middleware-io/blob/62c3dac/src/composer.ts#L36)
