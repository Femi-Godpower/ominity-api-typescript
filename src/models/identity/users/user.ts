/*
 * User model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../../hal.js";
import { buildPaginated, Paginated } from "../../pagination.js";

export type User = {
  resource: "user";
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string | null;
  language?: string | null;
  isMfaEnabled?: boolean;
  updatedAt?: string;
  createdAt?: string;
  links?: HalLinks;
};

/** @internal */
export const User$inboundSchema: z.ZodType<User> = z.object({
  resource: z.literal("user"),
  id: z.number().int(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  isMfaEnabled: z.boolean().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) =>
    remap$(v, { _links: "links" }) as User
  );

export type UsersListResponse = Paginated<User>;

/** @internal */
export const UsersListResponse$inboundSchema: z.ZodType<
  UsersListResponse
> = z.object({
  _embedded: z.object({
    users: z.array(User$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
  buildPaginated(v._embedded.users, v.count, v["_links"])
);
