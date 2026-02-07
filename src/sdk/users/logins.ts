/*
 * User logins SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { loginsCreate } from "../../funcs/users/loginsCreate.js";
import { loginsGet } from "../../funcs/users/loginsGet.js";
import { loginsList } from "../../funcs/users/loginsList.js";

export class UserLogins extends ClientSDK {
  async list(
    request: operations.ListUserLoginsRequest,
    options?: RequestOptions,
  ): Promise<operations.ListUserLoginsResponse> {
    return unwrapAsync(loginsList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetUserLoginRequest,
    options?: RequestOptions,
  ): Promise<operations.GetUserLoginResponse> {
    return unwrapAsync(loginsGet(
      this,
      request,
      options,
    ));
  }

  async create(
    request: operations.CreateUserLoginRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateUserLoginResponse> {
    return unwrapAsync(loginsCreate(
      this,
      request,
      options,
    ));
  }
}
