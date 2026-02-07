# Modules

The core SDK supports modular add-ons that live in separate npm packages.

## Recommended Usage

```ts
import { Ominity } from "@ominity/api-typescript";
import { bookingsModule, BookingsModule } from "@ominity/api-modules-bookings";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
});

// Either option is supported
ominity.use(BookingsModule);
// or
ominity.use(bookingsModule());

// Constructor option
const ominity2 = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
  modules: [bookingsModule()],
});

const res = await ominity.modules.bookings.events.list({ page: 1, limit: 20 });
console.log(res.items);
```

## Module Template

A module template project is provided in `.module/` for reuse. It mirrors the
core SDK structure and includes an example module.

## Conventions

- Mirror the core SDK structure (`models`, `models/operations`, `funcs`, `sdk`).
- Use `zod/v4` and `.loose()` for forward compatibility.
- Do not expose HAL fields (`_links`, `_embedded`) in public response types.
- Use `buildPaginated`/`applyPaginationParams` for paginated endpoints.
