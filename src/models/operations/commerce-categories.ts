/*
 * Commerce categories operations.
 */

import * as z from "zod/v4";
import { Category, CategoriesListResponse } from "../commerce/category.js";

export type CategoriesListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type CategoryGetParams = {
  include?: string | string[] | undefined;
};

export type ListCategoriesRequest = CategoriesListParams;
export type ListCategoriesResponse = CategoriesListResponse;

export type GetCategoryRequest = CategoryGetParams & {
  id: number | string;
};

export type GetCategoryResponse = Category;

/** @internal */
export const CategoriesListParams$outboundSchema: z.ZodType<
  CategoriesListParams
> = z.object({
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const CategoryGetParams$outboundSchema: z.ZodType<CategoryGetParams> = z
  .object({
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const GetCategoryRequest$outboundSchema: z.ZodType<GetCategoryRequest> =
  z.object({
    id: z.union([z.string(), z.number()]),
    include: z.union([z.string(), z.array(z.string())]).optional(),
  }).loose();
