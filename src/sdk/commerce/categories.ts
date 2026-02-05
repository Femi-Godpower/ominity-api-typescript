/*
 * SDK module: Commerce Categories
 */

import { categoriesGet } from "../../funcs/commerce/categoriesGet.js";
import { categoriesList } from "../../funcs/commerce/categoriesList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export type CategoriesListParams = operations.CategoriesListParams;
export type CategoryGetParams = operations.CategoryGetParams;

export class Categories extends ClientSDK {
  /**
   * List categories
   */
  async list(
    params?: CategoriesListParams,
    options?: RequestOptions,
  ): Promise<operations.ListCategoriesResponse> {
    return unwrapAsync(categoriesList(
      this,
      params,
      options,
    ));
  }

  /**
   * Get a category by ID
   */
  async get(
    id: number | string,
    params?: CategoryGetParams,
    options?: RequestOptions,
  ): Promise<operations.GetCategoryResponse> {
    const request: operations.GetCategoryRequest = {
      id,
      ...(params ?? {}),
    };

    return unwrapAsync(categoriesGet(
      this,
      request,
      options,
    ));
  }
}
