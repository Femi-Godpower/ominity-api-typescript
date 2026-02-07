/*
 * API key model.
 *
 * Note: fields are intentionally optional until a concrete schema is provided.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type ApiKey = {
  resource: "api_key";
  id?: number | string;
  description?: string;
  lastUsedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  links?: HalLinks;
};

/** @internal */
export const ApiKey$inboundSchema: z.ZodType<ApiKey> = z.object({
  resource: z.literal("api_key"),
  id: z.union([z.number().int(), z.string()]).optional(),
  description: z.string().optional(),
  lastUsedAt: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as ApiKey);
