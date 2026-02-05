/*
 * Commerce product models.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Paginated, buildPaginated } from "../pagination.js";
import { Category, Category$inboundSchema } from "./category.js";
import { ProductGroup, ProductGroup$inboundSchema } from "./product-group.js";
import { ProductOffer, ProductOffer$inboundSchema } from "./product-offer.js";
import { Route, Route$inboundSchema } from "./route.js";

export type ReviewSummary = {
  total: number;
  rating: number | null;
  breakdown: unknown[];
};

export type MeasurementValue = {
  value: number;
  unit: string;
};

export type Measurements = {
  height?: MeasurementValue;
  width?: MeasurementValue;
  depth?: MeasurementValue;
  weight?: MeasurementValue;
};

export type Product = {
  resource: string;
  id: number;
  sku: string;
  ean?: string | null;
  mpn?: string | null;
  asin?: string | null;
  title: string;
  shortTitle?: string | null;
  coverImage?: string | null;
  additionalImages?: string[];
  shortDescription?: string | null;
  description?: string | null;
  bulletpoints?: string[];
  boxContent?: string | null;
  type?: string;
  condition?: string;
  categoryId?: number | null;
  stock?: number | null;
  isBackorderAllowed?: boolean;
  routes?: Record<string, Route>;
  offers?: ProductOffer[];
  reviews?: ReviewSummary;
  searches?: string[];
  customFields?: unknown[];
  publishedAt?: string | null;
  videos?: unknown[];
  updatedAt?: string;
  createdAt?: string;
  measurements?: Measurements;
  category?: Category;
  productGroups?: ProductGroup[];
  links?: HalLinks;
};

export type ProductsListResponse = Paginated<Product>;

const MeasurementValue$inboundSchema = z.object({
  value: z.number(),
  unit: z.string(),
});

const Measurements$inboundSchema = z.object({
  height: MeasurementValue$inboundSchema.optional(),
  width: MeasurementValue$inboundSchema.optional(),
  depth: MeasurementValue$inboundSchema.optional(),
  weight: MeasurementValue$inboundSchema.optional(),
});

const ReviewSummary$inboundSchema = z.object({
  total: z.number(),
  rating: z.number().nullable(),
  breakdown: z.array(z.any()),
});

const ProductEmbedded$inboundSchema = z.object({
  category: Category$inboundSchema.optional(),
  product_groups: z.array(ProductGroup$inboundSchema).optional(),
}).loose();

/** @internal */
export const Product$inboundSchema: z.ZodType<Product> = z.object({
  resource: z.string(),
  id: z.number(),
  sku: z.string(),
  ean: z.string().nullable().optional(),
  mpn: z.string().nullable().optional(),
  asin: z.string().nullable().optional(),
  title: z.string(),
  shortTitle: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  additionalImages: z.array(z.string()).optional(),
  shortDescription: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  bulletpoints: z.array(z.string()).optional(),
  boxContent: z.string().nullable().optional(),
  type: z.string().optional(),
  condition: z.string().optional(),
  categoryId: z.number().nullable().optional(),
  stock: z.number().nullable().optional(),
  isBackorderAllowed: z.boolean().optional(),
  routes: z.record(z.string(), Route$inboundSchema).optional(),
  offers: z.array(ProductOffer$inboundSchema).optional(),
  reviews: ReviewSummary$inboundSchema.optional(),
  searches: z.array(z.string()).optional(),
  customFields: z.array(z.any()).optional(),
  publishedAt: z.string().nullable().optional(),
  videos: z.array(z.any()).optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  measurements: Measurements$inboundSchema.optional(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: ProductEmbedded$inboundSchema.optional(),
}).transform((v) => {
  const { _embedded } = v;
  const category = _embedded?.category;
  const productGroups = _embedded?.product_groups;

  const remapped = remap$(v, { _links: "links", _embedded: null });

  if (category !== undefined) {
    (remapped as Product).category = category;
  }
  if (productGroups !== undefined) {
    (remapped as Product).productGroups = productGroups;
  }

  return remapped as Product;
});

/** @internal */
export const ProductsListResponse$inboundSchema: z.ZodType<
  ProductsListResponse
> = z.object({
  _embedded: z.object({
    products: z.array(Product$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(v._embedded.products, v.count, v._links)
);
