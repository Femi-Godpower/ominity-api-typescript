import { RequestInput } from "../lib/http.js";
import { SDK_METADATA } from "../lib/config.js";
import { BeforeCreateRequestHook, HookContext } from "./types.js";

export class OminityHooks implements BeforeCreateRequestHook {
  beforeCreateRequest(
    hookContext: HookContext,
    input: RequestInput,
  ): RequestInput {
    this.validatePathParameters(input);

    let headers = new Headers(input.options?.headers);

    headers = this.handleIdempotencyKey(headers);
    headers = this.applyDefaultHeaders(headers, hookContext);
    headers = this.customizeUserAgent(headers, hookContext);

    return {
      ...input,
      options: {
        ...input.options,
        headers,
      },
    };
  }

  private applyDefaultHeaders(
    headers: Headers,
    hookContext: HookContext,
  ): Headers {
    if (!headers.has("accept")) {
      headers.set("Accept", "application/hal+json");
    }

    const language = hookContext.options.language;
    if (language && !headers.has("accept-language")) {
      headers.set("Accept-Language", language);
    }

    const channelId = hookContext.options.channelId;
    if (channelId && !headers.has("x-channel-id")) {
      headers.set("X-Channel-Id", channelId);
    }

    return headers;
  }

  private handleIdempotencyKey(headers: Headers): Headers {
    const idempotencyKey = "Idempotency-Key";

    if (!headers.has(idempotencyKey) || !headers.get(idempotencyKey)) {
      headers.set(idempotencyKey, this.generateIdempotencyKey());
    }

    return headers;
  }

  private customizeUserAgent(
    headers: Headers,
    hookContext: HookContext,
  ): Headers {
    if (this.isBrowserLike()) {
      return headers;
    }

    const customUserAgent = hookContext.options.customUserAgent;
    const userAgentKey = "User-Agent";
    const process = (globalThis as any)?.process;
    const sdkVersion = SDK_METADATA.sdkVersion;
    const nodeVersion = process?.version ? process.version : "unknown";
    const packageName = SDK_METADATA.userAgent.split(" ")[0];

    let userAgent = `TypeScript/${nodeVersion} ${packageName}/${sdkVersion}`;
    if (customUserAgent) {
      userAgent = `${userAgent} ${customUserAgent}`;
    }

    headers.set(userAgentKey, userAgent);
    return headers;
  }

  private generateIdempotencyKey(): string {
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private isBrowserLike(): boolean {
    const gt: unknown = typeof globalThis === "undefined" ? null : globalThis;
    const webWorkerLike = typeof gt === "object"
      && gt != null
      && "importScripts" in gt
      && typeof (gt as any)["importScripts"] === "function";
    return webWorkerLike
      || (typeof navigator !== "undefined" && "serviceWorker" in navigator)
      || (typeof window === "object" && typeof window.document !== "undefined");
  }

  private validatePathParameters(input: RequestInput): void {
    const url = input.url;
    const pathSegments = url.pathname.split("/");

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];

      if (i === 0 && segment === "") {
        continue;
      }

      if (segment === "" || segment?.trim() === "") {
        throw new Error(
          `Invalid request: empty path parameter detected in [${
            input.options?.method || "GET"
          }] '${url.pathname}'`,
        );
      }
    }
  }
}
