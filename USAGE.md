<!-- Start SDK Example Usage [usage] -->
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
<!-- End SDK Example Usage [usage] -->
