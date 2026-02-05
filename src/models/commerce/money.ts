/*
 * Money model.
 */

import * as z from "zod/v4";

export type Money = {
  amount: number;
  formatted: string;
};

export type PriceMap = Record<string, Money>;

/** @internal */
export const Money$inboundSchema: z.ZodType<Money> = z.object({
  amount: z.number(),
  formatted: z.string(),
});

/** @internal */
export const PriceMap$inboundSchema: z.ZodType<PriceMap> = z.record(
  z.string(),
  Money$inboundSchema,
);
