/*
 * Category model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { Tag, Tag$inboundSchema } from "../common/tag.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Route, Route$inboundSchema } from "./route.js";

export type Category = {
  resource: string;
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  fullSlug: string;
  description: string;
  coverImage: string | null;
  routes: Record<string, Route>;
  productsCount: number;
  customFields: unknown[];
  updatedAt: string;
  createdAt: string;
  parent?: Category;
  children?: Category[];
  tags?: Tag[];
  links?: HalLinks;
};

export type CategoriesListResponse = Paginated<Category>;

/** @internal */
export const Category$inboundSchema: z.ZodType<Category> = z.object({
  resource: z.string(),
  id: z.number(),
  parentId: z.number().nullable(),
  name: z.string(),
  slug: z.string(),
  fullSlug: z.string(),
  description: z.string(),
  coverImage: z.string().nullable(),
  routes: z.record(z.string(), Route$inboundSchema),
  productsCount: z.number(),
  customFields: z.array(z.any()),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
  _embedded: z.object({
    parent: z.lazy(() => Category$inboundSchema).optional(),
    children: z.array(z.lazy(() => Category$inboundSchema)).optional(),
    tags: z.array(Tag$inboundSchema).optional(),
  }).loose().optional(),
}).transform((v) => {
  const { _embedded } = v;
  const remapped = remap$(v, { _links: "links", _embedded: null });

  if (_embedded?.parent !== undefined) {
    (remapped as Category).parent = _embedded.parent;
  }
  if (_embedded?.children !== undefined) {
    (remapped as Category).children = _embedded.children;
  }
  if (_embedded?.tags !== undefined) {
    (remapped as Category).tags = _embedded.tags;
  }

  return remapped as Category;
});

/** @internal */
export const CategoriesListResponse$inboundSchema: z.ZodType<
  Paginated<Category>
> = z.object({
  _embedded: z.object({
    categories: z.array(Category$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(
    v._embedded.categories,
    v.count,
    v._links,
  )
);
