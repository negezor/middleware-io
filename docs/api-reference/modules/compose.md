[middleware-io](../README.md) / compose

# Module: compose

## Table of contents

### Functions

- [compose](compose.md#compose)

## Functions

### compose

▸ **compose**<T\>(`middlewares`): [Middleware](types.md#middleware)<T\>

Compose an array of middleware handlers into a single handler

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [Middleware](types.md#middleware)<T\>[] | The array of middleware |

#### Returns

[Middleware](types.md#middleware)<T\>

Composed middleware

#### Defined in

[compose.ts:17](https://github.com/negezor/middleware-io/blob/f841c99/src/compose.ts#L17)
