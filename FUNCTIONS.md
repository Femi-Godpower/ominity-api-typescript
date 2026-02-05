# Standalone Functions

> [!NOTE]
> This section is useful if you are using a bundler and targetting browsers and
> runtimes where the size of an application affects performance and load times. 

Standalone functions are available for the commerce products endpoints. These
functions return a `Result<Value, Error>` instead of throwing, which makes
error handling explicit in application code.

## Example

```typescript
import { OminityCore, productsGet, productsList } from "@ominity/api-typescript";

const client = new OminityCore({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
  },
  language: "en",
});

const result = await productsList(client, { limit: 10, include: ["offers"] });
if (result.ok) {
  console.log(result.value.items);
} else {
  console.error(result.error);
}

const single = await productsGet(client, { id: 1, include: "category" });
if (single.ok) {
  console.log(single.value);
}
```

## Result types

Standalone functions differ from SDK methods in that they return a
`Result<Value, Error>` type to capture _known errors_ and document them using
the type system. By avoiding throwing errors, application code maintains clear
control flow and error-handling become part of the regular flow of application
code.

> We use the term "known errors" because standalone functions, and JavaScript
> code in general, can still throw unexpected errors such as `TypeError`s,
> `RangeError`s and `DOMException`s. Exhaustively catching all errors may be
> something this SDK addresses in the future. Nevertheless, there is still a lot
> of benefit from capturing most errors and turning them into values.

The second reason for this style of programming is because these functions will
typically be used in front-end applications where exception throwing is
sometimes discouraged or considered unidiomatic. React and similar ecosystems
and libraries tend to promote this style of programming so that components
render useful content under all states (loading, success, error and so on).

Once standalone functions are added, this guide will show how to use the core
client with tree-shakable function imports.
