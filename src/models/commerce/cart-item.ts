/*
 * Cart item model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Product, Product$inboundSchema } from "./product.js";
import { ProductOffer, ProductOffer$inboundSchema } from "./product-offer.js";
import { buildPaginated, Paginated } from "../pagination.js";

export type CartItem = {
  resource: string;
  id: string;
  cartId: string;
  productId: number;
  productOfferId: number;
  quantity: number;
  unitAmount: CurrencyAmount;
  discountAmount: CurrencyAmount;
  taxAmount: CurrencyAmount;
  totalAmount: CurrencyAmount;
  isShippingRequired: boolean;
  updatedAt: string;
  createdAt: string;
  product?: Product;
  offer?: ProductOffer;
  links?: HalLinks;
};

export type CartItemsListResponse = Paginated<CartItem>;

/** @internal */
export const CartItem$inboundSchema: z.ZodType<CartItem> = z.object({
  resource: z.string(),
  id: z.string(),
  cartId: z.string(),
  productId: z.number(),
  productOfferId: z.number(),
  quantity: z.number(),
  unitAmount: CurrencyAmount$inboundSchema,
  discountAmount: CurrencyAmount$inboundSchema,
  taxAmount: CurrencyAmount$inboundSchema,
  totalAmount: CurrencyAmount$inboundSchema,
  isShippingRequired: z.boolean(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    product: Product$inboundSchema.optional(),
    offer: ProductOffer$inboundSchema.optional(),
  }).loose().optional(),
}).transform((v) => {
  const { _embedded } = v;
  const remapped = remap$(v, { _links: "links", _embedded: null });

  if (_embedded?.product !== undefined) {
    (remapped as CartItem).product = _embedded.product;
  }
  if (_embedded?.offer !== undefined) {
    (remapped as CartItem).offer = _embedded.offer;
  }

  return remapped as CartItem;
});

/** @internal */
export const CartItemsListResponse$inboundSchema: z.ZodType<
  Paginated<CartItem>
> = z.object({
  _embedded: z.object({
    cart_items: z.array(CartItem$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.cart_items,
    v.count,
    v._links,
  )
);
