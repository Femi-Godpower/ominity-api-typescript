/*
 * Commerce cart items operations.
 */

import * as z from "zod/v4";
import { CartItem, CartItemsListResponse } from "../commerce/cart-item.js";

export type CartItemsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type CartItemGetParams = {
  include?: string | string[] | undefined;
};

export type ListCartItemsRequest = CartItemsListParams & {
  cartId: string;
};
export type ListCartItemsResponse = CartItemsListResponse;

export type GetCartItemRequest = CartItemGetParams & {
  cartId: string;
  itemId: string;
};
export type GetCartItemResponse = CartItem;

export type CartItemCreateInput = {
  productId: number;
  productOfferId?: number | undefined;
  quantity?: number | undefined;
};
export type CartItemUpdateInput = {
  quantity?: number | undefined;
};

export type CreateCartItemRequest = {
  cartId: string;
  body: CartItemCreateInput;
};
export type CreateCartItemResponse = CartItem;

export type UpdateCartItemRequest = {
  cartId: string;
  itemId: string;
  body: CartItemUpdateInput;
};
export type UpdateCartItemResponse = CartItem;

export type DeleteCartItemRequest = {
  cartId: string;
  itemId: string;
};
export type DeleteCartItemResponse = void;

/** @internal */
export const CartItemsListParams$outboundSchema: z.ZodType<CartItemsListParams> =
  z.object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  }).loose();

/** @internal */
export const CartItemGetParams$outboundSchema: z.ZodType<CartItemGetParams> = z
  .object({
    include: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const ListCartItemsRequest$outboundSchema: z.ZodType<
  ListCartItemsRequest
> = z.object({
  cartId: z.string(),
  page: z.number().int().optional(),
  limit: z.number().int().optional(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
  filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetCartItemRequest$outboundSchema: z.ZodType<GetCartItemRequest> =
  z.object({
    cartId: z.string(),
    itemId: z.string(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
  }).loose();

/** @internal */
export const CreateCartItemRequest$outboundSchema: z.ZodType<
  CreateCartItemRequest
> = z.object({
  cartId: z.string(),
  body: z.object({
    productId: z.number(),
    productOfferId: z.number().optional(),
    quantity: z.number().optional(),
  }).loose(),
});

/** @internal */
export const UpdateCartItemRequest$outboundSchema: z.ZodType<
  UpdateCartItemRequest
> = z.object({
  cartId: z.string(),
  itemId: z.string(),
  body: z.object({
    quantity: z.number().optional(),
  }).loose(),
});

/** @internal */
export const DeleteCartItemRequest$outboundSchema: z.ZodType<
  DeleteCartItemRequest
> = z.object({
  cartId: z.string(),
  itemId: z.string(),
});
