/*
 * Commerce products operations.
 */

import * as z from "zod/v4";
import { Product, ProductsListResponse } from "../commerce/product.js";

export type ProductsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type ProductGetParams = {
  include?: string | string[] | undefined;
};

export type ListProductsRequest = ProductsListParams;
export type ListProductsResponse = ProductsListResponse;

export type GetProductRequest = ProductGetParams & {
  id: number | string;
};

export type GetProductResponse = Product;

/** @internal */
export const ProductsListParams$outboundSchema: z.ZodType<ProductsListParams> = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const ProductGetParams$outboundSchema: z.ZodType<ProductGetParams> = z
  .object({
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const GetProductRequest$outboundSchema: z.ZodType<GetProductRequest> = z
  .object({
    id: z.union([z.string(), z.number()]),
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();
