/*
 * /me SDK.
 */

import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import { unwrapAsync } from "../types/fp.js";
import * as operations from "../models/operations/index.js";
import { meGet } from "../funcs/meGet.js";

export class Me extends ClientSDK {
  async get(options?: RequestOptions): Promise<operations.GetMeResponse> {
    return unwrapAsync(meGet(
      this,
      options,
    ));
  }
}
