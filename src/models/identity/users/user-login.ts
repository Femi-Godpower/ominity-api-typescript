/*
 * User login model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../../hal.js";
import { buildPaginated, Paginated } from "../../pagination.js";

export type UserLogin = {
  resource: "user_login";
  id: number;
  userId: number;
  ipAddress?: string;
  location?: string | null;
  device?: string | null;
  browser?: string | null;
  userAgent?: string;
  createdAt?: string;
  links?: HalLinks;
};

/** @internal */
export const UserLogin$inboundSchema: z.ZodType<UserLogin> = z.object({
  resource: z.literal("user_login"),
  id: z.number().int(),
  userId: z.number().int(),
  ipAddress: z.string().optional(),
  location: z.string().nullable().optional(),
  device: z.string().nullable().optional(),
  browser: z.string().nullable().optional(),
  userAgent: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as UserLogin);

export type UserLoginsListResponse = Paginated<UserLogin>;

/** @internal */
export const UserLoginsListResponse$inboundSchema: z.ZodType<
  UserLoginsListResponse
> = z.object({
  _embedded: z.object({
    user_logins: z.array(UserLogin$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(v._embedded.user_logins, v.count, v["_links"])
);
