/*
 * Cart model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import * as openEnums from "../../types/enums.js";
import { OpenEnum } from "../../types/enums.js";
import { Address, Address$inboundSchema } from "./address.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { CartItem, CartItem$inboundSchema } from "./cart-item.js";

export const CartStatus = {
  Open: "open",
  Completed: "completed",
  Abandoned: "abandoned",
  Expired: "expired",
} as const;
export type CartStatus = OpenEnum<typeof CartStatus>;

export const CartType = {
  Shared: "shared",
  Default: "default",
} as const;
export type CartType = OpenEnum<typeof CartType>;

export type Cart = {
  resource: string;
  id: string;
  status: CartStatus;
  type: CartType;
  channelId?: number;
  languageId?: number | null;
  customerId?: number | null;
  userId?: number | null;
  email?: string;
  companyName?: string;
  companyVat?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  subtotalAmount?: CurrencyAmount;
  shippingAmount?: CurrencyAmount;
  discountAmount?: CurrencyAmount;
  taxAmount?: CurrencyAmount;
  totalAmount?: CurrencyAmount;
  country?: string;
  currency?: string;
  isShippingRequired?: boolean;
  shippingMethodId?: number | null;
  isTaxExempt?: boolean;
  items?: CartItem[];
  itemsCount?: number;
  itemsExists?: boolean;
  shippingMethod?: unknown;
  shippingMethodCount?: number;
  shippingMethodExists?: boolean;
  totalQuantity?: number;
  promotionCodes?: string[];
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
};

/** @internal */
export const CartStatus$inboundSchema: z.ZodType<CartStatus, unknown> = openEnums
  .inboundSchema(CartStatus);
/** @internal */
export const CartType$inboundSchema: z.ZodType<CartType, unknown> = openEnums
  .inboundSchema(CartType);

/** @internal */
export const Cart$inboundSchema: z.ZodType<Cart> = z.object({
  resource: z.string(),
  id: z.string(),
  status: CartStatus$inboundSchema,
  type: CartType$inboundSchema,
  channelId: z.number().optional(),
  languageId: z.number().nullable().optional(),
  customerId: z.number().nullable().optional(),
  userId: z.number().nullable().optional(),
  email: z.string().optional(),
  companyName: z.string().optional(),
  companyVat: z.string().optional(),
  billingAddress: Address$inboundSchema.optional(),
  shippingAddress: Address$inboundSchema.optional(),
  subtotalAmount: CurrencyAmount$inboundSchema.optional(),
  shippingAmount: CurrencyAmount$inboundSchema.optional(),
  discountAmount: CurrencyAmount$inboundSchema.optional(),
  taxAmount: CurrencyAmount$inboundSchema.optional(),
  totalAmount: CurrencyAmount$inboundSchema.optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
  isShippingRequired: z.boolean().optional(),
  shippingMethodId: z.number().nullable().optional(),
  isTaxExempt: z.boolean().optional(),
  items: z.array(CartItem$inboundSchema).optional(),
  itemsCount: z.number().optional(),
  itemsExists: z.boolean().optional(),
  shippingMethod: z.any().optional(),
  shippingMethodCount: z.number().optional(),
  shippingMethodExists: z.boolean().optional(),
  totalQuantity: z.number().optional(),
  promotionCodes: z.array(z.string()).optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => remap$(v, { _links: "links" }) as Cart);

export type CartsListResponse = Paginated<Cart>;

/** @internal */
export const CartsListResponse$inboundSchema: z.ZodType<
  CartsListResponse
> = z.object({
  _embedded: z.object({
    carts: z.array(Cart$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.carts,
    v.count,
    v._links,
  )
);
