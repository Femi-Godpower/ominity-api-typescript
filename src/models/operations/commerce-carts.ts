/*
 * Commerce carts operations.
 */

import * as z from "zod/v4";
import { Cart, CartType, CartsListResponse } from "../commerce/cart.js";
import { Address, Address$inboundSchema } from "../commerce/address.js";

export type CartsListParams = {
  page?: number | undefined;
  limit?: number | undefined;
  include?: string | string[] | undefined;
  filter?: Record<string, unknown> | string | undefined;
  sort?: string | string[] | undefined;
};

export type CartGetParams = {
  include?: string | string[] | undefined;
};

export type ListCartsRequest = CartsListParams;
export type ListCartsResponse = CartsListResponse;

export type GetCartRequest = CartGetParams & {
  id: string;
};

export type GetCartResponse = Cart;

export type CartItemInput = {
  id?: string | undefined;
  productId: number;
  productOfferId?: number | undefined;
  quantity?: number | undefined;
};

export type CartCreateInput = {
  visitorId?: number | null | undefined;
  customerId?: number | null | undefined;
  userId?: number | null | undefined;
  type?: CartType | undefined;
  email?: string | null | undefined;
  companyName?: string | null | undefined;
  companyVat?: string | null | undefined;
  taxExempt?: boolean | undefined;
  country: string;
  currency?: string | null | undefined;
  billingAddress?: Address | null | undefined;
  shippingAddress?: Address | null | undefined;
  items?: CartItemInput[] | undefined;
  shippingMethodId?: number | null | undefined;
  promotionCodes?: string[] | null | undefined;
};

export type CartUpdateInput = {
  visitorId?: number | null | undefined;
  customerId?: number | null | undefined;
  userId?: number | null | undefined;
  email?: string | null | undefined;
  companyName?: string | null | undefined;
  companyVat?: string | null | undefined;
  taxExempt?: boolean | undefined;
  country?: string | undefined;
  currency?: string | undefined;
  billingAddress?: Address | null | undefined;
  shippingAddress?: Address | null | undefined;
  items?: CartItemInput[] | undefined;
  shippingMethodId?: number | null | undefined;
  promotionCodes?: string[] | null | undefined;
};

export type CreateCartRequest = CartCreateInput;
export type CreateCartResponse = Cart;

export type UpdateCartRequest = {
  id: string;
  body: CartUpdateInput;
};

export type UpdateCartResponse = Cart;

/** @internal */
export const CartsListParams$outboundSchema: z.ZodType<CartsListParams> = z
  .object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .loose();

/** @internal */
export const CartGetParams$outboundSchema: z.ZodType<CartGetParams> = z.object({
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const GetCartRequest$outboundSchema: z.ZodType<GetCartRequest> = z.object({
  id: z.string(),
  include: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
const CartItemInput$outboundSchema: z.ZodType<CartItemInput> = z.object({
  id: z.string().optional(),
  productId: z.number(),
  productOfferId: z.number().optional(),
  quantity: z.number().optional(),
}).loose();

/** @internal */
const CartType$outboundSchema: z.ZodType<CartType> = z.string().transform(
  (value) => value as CartType,
);

export const CreateCartRequest$outboundSchema: z.ZodType<CreateCartRequest> = z
  .object({
    visitorId: z.number().nullable().optional(),
    customerId: z.number().nullable().optional(),
    userId: z.number().nullable().optional(),
    type: CartType$outboundSchema.optional(),
    email: z.string().nullable().optional(),
    companyName: z.string().nullable().optional(),
    companyVat: z.string().nullable().optional(),
    taxExempt: z.boolean().optional(),
    country: z.string(),
    currency: z.string().nullable().optional(),
    billingAddress: Address$inboundSchema.nullable().optional(),
    shippingAddress: Address$inboundSchema.nullable().optional(),
    items: z.array(CartItemInput$outboundSchema).optional(),
    shippingMethodId: z.number().nullable().optional(),
    promotionCodes: z.array(z.string()).nullable().optional(),
  })
  .loose()
  .transform((v) => v as CreateCartRequest);

/** @internal */
export const UpdateCartRequest$outboundSchema: z.ZodType<UpdateCartRequest> = z
  .object({
    id: z.string(),
    body: z.object({
      visitorId: z.number().nullable().optional(),
      customerId: z.number().nullable().optional(),
      userId: z.number().nullable().optional(),
      email: z.string().nullable().optional(),
      companyName: z.string().nullable().optional(),
      companyVat: z.string().nullable().optional(),
      taxExempt: z.boolean().optional(),
      country: z.string().optional(),
      currency: z.string().optional(),
      billingAddress: Address$inboundSchema.nullable().optional(),
      shippingAddress: Address$inboundSchema.nullable().optional(),
      items: z.array(CartItemInput$outboundSchema).optional(),
      shippingMethodId: z.number().nullable().optional(),
      promotionCodes: z.array(z.string()).nullable().optional(),
    }).loose(),
  }).transform((v) => v as UpdateCartRequest);
