/*
 * Admin model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Admin = {
  resource: "admin";
  id: number;
  name?: string;
  email?: string;
  avatar?: string | null;
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
};

/** @internal */
export const Admin$inboundSchema: z.ZodType<Admin> = z.object({
  resource: z.literal("admin"),
  id: z.number().int(),
  name: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as Admin);
