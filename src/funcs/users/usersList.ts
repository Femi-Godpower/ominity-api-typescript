/*
 * List users.
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
import { UsersListResponse$inboundSchema } from "../../models/identity/users/user.js";
import { applyPaginationParams } from "../../models/pagination.js";
import { APICall, APIPromise } from "../../types/async.js";
import { OK, Result } from "../../types/fp.js";

export function usersList(
  client: ClientSDK,
  request?: operations.UsersListParams | undefined,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.ListUsersResponse,
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
  request?: operations.UsersListParams | undefined,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.ListUsersResponse,
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
      operations.UsersListParams$outboundSchema.optional().parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;

  const path = "/users";

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

  const headers = new Headers({
    Accept: "application/hal+json",
  });

  const securityInput = await extractSecurity(client._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "users.list",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client._options.security,
    retryConfig: options?.retries
      || client._options.retryConfig
      || {
        strategy: "backoff",
        backoff: {
          initialInterval: 500,
          maxInterval: 5000,
          exponent: 2,
          maxElapsedTime: 7500,
        },
        retryConnectionErrors: true,
      }
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["5xx"],
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
    errorCodes: ["400", "4XX", "5XX"],
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
    operations.ListUsersResponse,
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
    M.json(200, UsersListResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.jsonErr("4XX", errors.ErrorResponse$inboundSchema, {
      ctype: "application/hal+json",
    }),
    M.fail("5XX"),
  )(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [
    OK(applyPaginationParams(result.value, payload)),
    { status: "complete", request: req, response },
  ];
}
