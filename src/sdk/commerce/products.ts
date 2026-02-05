/*
 * SDK module: Commerce Products
 */

import { productsGet } from "../../funcs/commerce/productsGet.js";
import { productsList } from "../../funcs/commerce/productsList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export type ProductsListParams = operations.ProductsListParams;
export type ProductGetParams = operations.ProductGetParams;

export class Products extends ClientSDK {
  /**
   * List products
   */
  async list(
    params?: ProductsListParams,
    options?: RequestOptions,
  ): Promise<operations.ListProductsResponse> {
    return unwrapAsync(productsList(
      this,
      params,
      options,
    ));
  }

  /**
   * Get a product by ID
   */
  async get(
    id: number | string,
    params?: ProductGetParams,
    options?: RequestOptions,
  ): Promise<operations.GetProductResponse> {
    const request: operations.GetProductRequest = {
      id,
      ...(params ?? {}),
    };

    return unwrapAsync(productsGet(
      this,
      request,
      options,
    ));
  }
}
