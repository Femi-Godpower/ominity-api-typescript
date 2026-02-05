/*
 * SDK module: Commerce Cart Items
 */

import { cartItemsCreate } from "../../funcs/commerce/cartItemsCreate.js";
import { cartItemsDelete } from "../../funcs/commerce/cartItemsDelete.js";
import { cartItemsGet } from "../../funcs/commerce/cartItemsGet.js";
import { cartItemsList } from "../../funcs/commerce/cartItemsList.js";
import { cartItemsUpdate } from "../../funcs/commerce/cartItemsUpdate.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export type CartItemsListParams = operations.CartItemsListParams;
export type CartItemGetParams = operations.CartItemGetParams;
export type CartItemCreateInput = operations.CartItemCreateInput;
export type CartItemUpdateInput = operations.CartItemUpdateInput;

export class CartItems extends ClientSDK {
  /**
   * List cart items
   */
  async list(
    cartId: string,
    params?: CartItemsListParams,
    options?: RequestOptions,
  ): Promise<operations.ListCartItemsResponse> {
    return unwrapAsync(cartItemsList(
      this,
      {
        cartId,
        ...(params ?? {}),
      },
      options,
    ));
  }

  /**
   * Get a cart item by ID
   */
  async get(
    cartId: string,
    itemId: string,
    params?: CartItemGetParams,
    options?: RequestOptions,
  ): Promise<operations.GetCartItemResponse> {
    return unwrapAsync(cartItemsGet(
      this,
      {
        cartId,
        itemId,
        ...(params ?? {}),
      },
      options,
    ));
  }

  /**
   * Create a cart item
   */
  async create(
    cartId: string,
    body: CartItemCreateInput,
    options?: RequestOptions,
  ): Promise<operations.CreateCartItemResponse> {
    return unwrapAsync(cartItemsCreate(
      this,
      {
        cartId,
        body,
      },
      options,
    ));
  }

  /**
   * Update a cart item
   */
  async update(
    cartId: string,
    itemId: string,
    body: CartItemUpdateInput,
    options?: RequestOptions,
  ): Promise<operations.UpdateCartItemResponse> {
    return unwrapAsync(cartItemsUpdate(
      this,
      {
        cartId,
        itemId,
        body,
      },
      options,
    ));
  }

  /**
   * Delete a cart item
   */
  async delete(
    cartId: string,
    itemId: string,
    options?: RequestOptions,
  ): Promise<void> {
    return unwrapAsync(cartItemsDelete(
      this,
      {
        cartId,
        itemId,
      },
      options,
    ));
  }
}
