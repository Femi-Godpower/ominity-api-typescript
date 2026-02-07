import * as models from "../models/index.js";
import { HTTPClient } from "./http.js";
import { Logger } from "./logger.js";
import { RetryConfig } from "./retries.js";

export type SDKOptions = {
  /**
   * The security details required to authenticate the SDK
   */
  security?: models.Security | (() => Promise<models.Security>) | undefined;

  /**
   * Sets the default Accept-Language header for requests.
   * Can be overridden per-request via headers.
   */
  language?: string | undefined;

  /**
   * Sets the default X-Channel-Id header for requests.
   * Can be overridden per-request via headers.
   */
  channelId?: string | undefined;

  /**
   * Adds a custom value to the User-Agent header.
   */
  customUserAgent?: string | undefined;

  /**
   * API version appended to the server URL. Defaults to "v1".
   */
  apiVersion?: string | undefined;

  httpClient?: HTTPClient;
  /**
   * Allows overriding the default server URL used by the SDK
   */
  serverURL?: string | undefined;
  /**
   * Allows overriding the default user agent used by the SDK
   */
  userAgent?: string | undefined;
  /**
   * Allows overriding the default retry config used by the SDK
   */
  retryConfig?: RetryConfig;
  timeoutMs?: number;
  debugLogger?: Logger;
};

export function serverURLFromOptions(options: SDKOptions): URL | null {
  const serverURL = options.serverURL;
  if (!serverURL) {
    throw new Error("serverURL is required to initialize the SDK");
  }

  const url = new URL(serverURL);
  return applyApiVersion(url, options.apiVersion ?? "v1");
}

function applyApiVersion(url: URL, apiVersion: string | undefined): URL {
  if (!apiVersion) {
    return url;
  }

  const currentPath = url.pathname.replace(/\/+$/, "");
  const versionSuffix = `/${apiVersion}`;

  if (currentPath.endsWith(versionSuffix)) {
    url.pathname = `${currentPath}/`;
    return url;
  }

  url.pathname = `${currentPath}${versionSuffix}`;
  return url;
}

export const SDK_VERSION = "0.0.3";

export const SDK_METADATA = {
  language: "typescript",
  openapiDocVersion: "manual",
  sdkVersion: SDK_VERSION,
  genVersion: "manual",
  userAgent: `ominity-sdk/typescript ${SDK_VERSION}`,
} as const;
