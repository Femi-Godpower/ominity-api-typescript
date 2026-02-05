/*
 * Shared HAL link types.
 */

import * as z from "zod/v4";

export type HalLink = {
  href: string;
  type?: string | null | undefined;
};

export type HalLinks = Record<string, HalLink | null | undefined>;

/** @internal */
export const HalLink$inboundSchema: z.ZodType<HalLink> = z.object({
  href: z.string(),
  type: z.string().nullable().optional(),
});

/** @internal */
export const HalLinks$inboundSchema: z.ZodType<HalLinks> = z.record(
  z.string(),
  z.union([HalLink$inboundSchema, z.null()]),
);
