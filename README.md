# @ominity/api-typescript

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *@ominity/api-typescript* API.

<br /><br />
> [!IMPORTANT]
> This SDK is under active development and not yet ready for production use.

<!-- Start Summary [summary] -->
## Summary

Type-safe TypeScript SDK for the Ominity API. This SDK is manually maintained
and provides a stable core, module namespaces (`commerce`, `cms`, `settings`),
and a generic HTTP client for endpoints not yet implemented.

Documentation: https://docs.ominity.com
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [@ominity/api-typescript](#ominityapi-typescript)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [File uploads](#file-uploads)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server URL Per-Client](#server-url-per-client)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add @ominity/api-typescript
```

### PNPM

```bash
pnpm add @ominity/api-typescript
```

### Bun

```bash
bun add @ominity/api-typescript
```

### Yarn

```bash
yarn add @ominity/api-typescript
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { Ominity } from "@ominity/api-typescript";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
  },
  language: "en",
  channelId: "019c2dee-2ed6-7754-8698-6b8dd37bc61e",
});

async function run() {
  const res = await ominity.http.get("/commerce/products", {
    query: { include: "variants", sort: "-price" },
  });

  console.log(await res.json());
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security schemes globally:

| Name    | Type   | Scheme         | Environment Variable      |
| ------- | ------ | -------------- | ------------------------- |
| `apiKey` | http | Bearer (API key) | `OMINITY_API_KEY`         |
| `oAuth`  | http | Bearer (OAuth)   | `OMINITY_OAUTH_TOKEN`     |

To authenticate with the API, set the `security` object when initializing the SDK client instance. If `security.oAuth` is provided, it will be used; otherwise `security.apiKey` is used.
For example:
```typescript
import { Ominity } from "@ominity/api-typescript";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
    // oAuth: process.env["OMINITY_OAUTH_TOKEN"] ?? "",
  },
});

async function run() {
  const res = await ominity.http.get("/commerce/products");
  console.log(await res.json());
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

Typed operations are being added. Current namespaces:

- `commerce`
- `cms`
- `settings`
- `http` (generic client for unimplemented endpoints)

Use `ominity.http` for endpoints that are not yet implemented in the SDK.
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

Standalone functions are not yet available. This SDK currently focuses on the
class-based client and the generic `http` helper.

To read more about the intended standalone function approach, check
[FUNCTIONS.md](./FUNCTIONS.md).
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start File uploads [file-upload] -->
## File uploads

Certain SDK methods accept files as part of a multi-part request. It is possible and typically recommended to upload files as a stream rather than reading the entire contents into memory. This avoids excessive memory consumption and potentially crashing with out-of-memory errors when working with very large files. The following example demonstrates how to attach a file stream to a request.

> [!TIP]
>
> Depending on your JavaScript runtime, there are convenient utilities that return a handle to a file without reading the entire contents into memory:
>
> - **Node.js v20+:** Since v20, Node.js comes with a native `openAsBlob` function in [`node:fs`](https://nodejs.org/docs/latest-v20.x/api/fs.html#fsopenasblobpath-options).
> - **Bun:** The native [`Bun.file`](https://bun.sh/docs/api/file-io#reading-files-bun-file) function produces a file handle that can be used for streaming file uploads.
> - **Browsers:** All supported browsers return an instance to a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) when reading the value from an `<input type="file">` element.
> - **Node.js v18:** A file stream can be created using the `fileFrom` helper from [`fetch-blob/from.js`](https://www.npmjs.com/package/fetch-blob).

```typescript
import { Ominity } from "@ominity/api-typescript";
import { openAsBlob } from "node:fs";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
  },
});

async function run() {
  const form = new FormData();
  form.append("file", await openAsBlob("./path/to/file.pdf"));

  const res = await ominity.http.post("/files", {
    body: form,
  });

  console.log(await res.json());
}

run();

```
<!-- End File uploads [file-upload] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { Ominity } from "@ominity/api-typescript";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
  },
});

async function run() {
  const res = await ominity.http.get("/commerce/products", {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(await res.json());
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { Ominity } from "@ominity/api-typescript";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
  },
});

async function run() {
  const res = await ominity.http.get("/commerce/products");

  console.log(await res.json());
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`OminityError`](./src/models/errors/ominity-error.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { Ominity } from "@ominity/api-typescript";
import * as errors from "@ominity/api-typescript/models/errors";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
    oAuth: process.env["OMINITY_OAUTH_TOKEN"] ?? "",
  },
});

async function run() {
  try {
    // Call a method that performs a request
    console.log(ominity);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.OminityError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Structured API error response
      if (error instanceof errors.ErrorResponse) {
        console.log(error.data$.status); // number
        console.log(error.data$.title); // string
      }
    }
  }
}

run();

```

### Error Classes
**Primary error:**
* [`OminityError`](./src/models/errors/ominity-error.ts): The base class for HTTP error responses.

<details><summary>Less common errors (9)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/http-client-errors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/http-client-errors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/http-client-errors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/http-client-errors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/http-client-errors.ts): Unrecognised or unexpected error.


**Inherit from [`OminityError`](./src/models/errors/ominity-error.ts)**:
* [`ErrorResponse`](./src/models/errors/error-response.ts): Standard API error response (including validation errors).
* [`ResponseValidationError`](./src/models/errors/response-validation-error.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>

\* Check [the method documentation](#available-resources-and-operations) to see if the error is applicable.
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server URL Per-Client

Each tenant runs on its own domain, so `serverURL` is required when initializing the SDK client instance. The SDK appends the API version (default `"v1"`) to this base URL. For example:
```typescript
import { Ominity } from "@ominity/api-typescript";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env["OMINITY_API_KEY"] ?? "",
    oAuth: process.env["OMINITY_OAUTH_TOKEN"] ?? "",
  },
  language: "en",
  channelId: "web",
});

async function run() {
  console.log(ominity);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { Ominity } from "@ominity/api-typescript";
import { HTTPClient } from "@ominity/api-typescript/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
  httpClient: httpClient,
});
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { Ominity } from "@ominity/api-typescript";

const sdk = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
  debugLogger: console,
});
```

You can also enable a default debug logger by setting an environment variable `OMINITY_DEBUG` to true.
<!-- End Debugging [debug] -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, it is still under active development.
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release.
