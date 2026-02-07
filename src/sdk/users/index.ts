/*
 * Users SDK.
 */

import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import { unwrapAsync } from "../../types/fp.js";
import * as operations from "../../models/operations/index.js";
import { usersCreate } from "../../funcs/users/usersCreate.js";
import { usersGet } from "../../funcs/users/usersGet.js";
import { usersList } from "../../funcs/users/usersList.js";
import { usersUpdate } from "../../funcs/users/usersUpdate.js";
import { UserLogins } from "./logins.js";

export class Users extends ClientSDK {
  private _logins?: UserLogins;

  get logins(): UserLogins {
    return (this._logins ??= new UserLogins(this._options));
  }

  async list(
    request?: operations.UsersListParams | undefined,
    options?: RequestOptions,
  ): Promise<operations.ListUsersResponse> {
    return unwrapAsync(usersList(
      this,
      request,
      options,
    ));
  }

  async get(
    request: operations.GetUserRequest,
    options?: RequestOptions,
  ): Promise<operations.GetUserResponse> {
    return unwrapAsync(usersGet(
      this,
      request,
      options,
    ));
  }

  async create(
    request: operations.CreateUserRequest,
    options?: RequestOptions,
  ): Promise<operations.CreateUserResponse> {
    return unwrapAsync(usersCreate(
      this,
      request,
      options,
    ));
  }

  async update(
    request: operations.UpdateUserRequest,
    options?: RequestOptions,
  ): Promise<operations.UpdateUserResponse> {
    return unwrapAsync(usersUpdate(
      this,
      request,
      options,
    ));
  }
}
