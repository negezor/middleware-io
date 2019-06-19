> ## [middleware-io](../README.md)

["compose"](_compose_.md) /

# External module: "compose"

### Index

#### Functions

* [compose](_compose_.md#compose)

## Functions

###  compose

▸ **compose**<**T**>(`middlewares`: [Middleware](_types_.md#middleware)‹*`T`*›[]): *[Middleware](_types_.md#middleware)‹*`T`*›*

*Defined in [compose.ts:17](url)*

Compose an array of middleware handlers into a single handler

**Type parameters:**

■` T`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`middlewares` | [Middleware](_types_.md#middleware)‹*`T`*›[] | The array of middleware  |

**Returns:** *[Middleware](_types_.md#middleware)‹*`T`*›*

Composed middleware

___