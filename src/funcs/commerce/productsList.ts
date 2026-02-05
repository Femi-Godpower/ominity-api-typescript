/*
 * List products.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import {
  encodeDeepObjectQuery,
  encodeFormQuery,
  queryJoin,
} from "../../lib/encodings.js";
import * as M from "../../lib/matchers.js";
import { safeParse } from "../../lib/schemas.js";
import { extractSecurity, resolveGlobalSecurity } from "../../lib/security.js";
import * as errors from "../../models/errors/index.js";
import { ResponseValidationError } from "../../models/errors/response-validation-error.js";
import { SDKValidationError } from "../../models/errors/sdk-validation-error.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../../models/errors/http-client-errors.js";
import * as operations from "../../models/operations/index.js";
import { ProductsListResponse$inboundSchema } from "../../models/commerce/product.js";
import { applyPaginationParams } from "../../models/pagination.js";
import { APICall, APIPromise } from "../../types/async.js";
import { OK, Result } from "../../types/fp.js";

export function productsList(
  client: ClientSDK,
  request?: operations.ProductsListParams | undefined,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.ListProductsResponse,
    | errors.ErrorResponse
    | errors.OminityDefaultError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >
> {
  return new APIPromise($do(
    client,
    request,
    options,
  ));
}

async function $do(
  client: ClientSDK,
  request?: operations.ProductsListParams | undefined,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.ListProductsResponse,
      | errors.ErrorResponse
      | errors.OminityDefaultError
      | ResponseValidationError
      | ConnectionError
      | RequestAbortedError
      | RequestTimeoutError
      | InvalidRequestError
      | UnexpectedClientError
      | SDKValidationError
    >,
    APICall,
  ]
> {
  const parsed = safeParse(
    request,
    (value) =>
      operations.ProductsListParams$outboundSchema.optional().parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;

  const path = "/commerce/products";

  const baseQuery = encodeFormQuery({
    page: payload?.page,
    limit: payload?.limit,
    include: payload?.include,
    sort: payload?.sort,
  });

  let filterQuery: string | undefined;
  if (typeof payload?.filter === "string") {
    filterQuery = encodeFormQuery({ filter: payload.filter });
  } else if (
    payload?.filter != null
    && typeof payload.filter === "object"
    && !Array.isArray(payload.filter)
  ) {
    filterQuery = encodeDeepObjectQuery({ filter: payload.filter });
  }

  const query = queryJoin(baseQuery, filterQuery);

  const headers = new Headers();

  const securityInput = await extractSecurity(client._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "commerce.products.list",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.security,
    retryConfig: options?.retries
      || client._options.retryConfig
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "5XX"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path,
    headers,
    query,
    body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["4XX", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result] = await M.match<
    operations.ListProductsResponse,
    | errors.ErrorResponse
    | errors.OminityDefaultError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >(
    M.json(200, ProductsListResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.jsonErr("4XX", errors.ErrorResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.fail("4XX"),
    M.fail("5XX"),
  )(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  const finalValue = applyPaginationParams(result.value, payload);

  return [OK(finalValue), { status: "complete", request: req, response }];
}
