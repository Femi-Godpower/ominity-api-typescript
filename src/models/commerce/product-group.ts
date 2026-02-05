/*
 * Product group model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ProductGroup = {
  resource?: string;
  id?: number;
  name?: string;
  links?: HalLinks;
  [key: string]: unknown;
};

/** @internal */
export const ProductGroup$inboundSchema: z.ZodType<ProductGroup> = z.object({
  resource: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
}).loose().transform((v) => remap$(v, { _links: "links" }) as ProductGroup);
