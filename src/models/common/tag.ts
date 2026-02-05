/*
 * Tag model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Tag = {
  resource: string;
  id: number;
  label: string;
  color: string;
  updatedAt: string;
  createdAt: string;
  links?: HalLinks;
};

/** @internal */
export const Tag$inboundSchema: z.ZodType<Tag> = z.object({
  resource: z.string(),
  id: z.number(),
  label: z.string(),
  color: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => remap$(v, { _links: "links" }) as Tag);
