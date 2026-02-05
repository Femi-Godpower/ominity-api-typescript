/*
 * SDK module: Commerce Carts
 */

import { cartsCreate } from "../../funcs/commerce/cartsCreate.js";
import { cartsGet } from "../../funcs/commerce/cartsGet.js";
import { cartsList } from "../../funcs/commerce/cartsList.js";
import { cartsUpdate } from "../../funcs/commerce/cartsUpdate.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export type CartsListParams = operations.CartsListParams;
export type CartGetParams = operations.CartGetParams;
export type CartCreateInput = operations.CartCreateInput;
export type CartUpdateInput = operations.CartUpdateInput;

export class Carts extends ClientSDK {
  /**
   * List carts
   */
  async list(
    params?: CartsListParams,
    options?: RequestOptions,
  ): Promise<operations.ListCartsResponse> {
    return unwrapAsync(cartsList(
      this,
      params,
      options,
    ));
  }

  /**
   * Get a cart by ID
   */
  async get(
    id: string,
    params?: CartGetParams,
    options?: RequestOptions,
  ): Promise<operations.GetCartResponse> {
    const request: operations.GetCartRequest = {
      id,
      ...(params ?? {}),
    };

    return unwrapAsync(cartsGet(
      this,
      request,
      options,
    ));
  }

  /**
   * Create a cart
   */
  async create(
    body: CartCreateInput,
    options?: RequestOptions,
  ): Promise<operations.CreateCartResponse> {
    return unwrapAsync(cartsCreate(
      this,
      body,
      options,
    ));
  }

  /**
   * Update a cart
   */
  async update(
    id: string,
    body: CartUpdateInput,
    options?: RequestOptions,
  ): Promise<operations.UpdateCartResponse> {
    return unwrapAsync(cartsUpdate(
      this,
      { id, body },
      options,
    ));
  }
}
