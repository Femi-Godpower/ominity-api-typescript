/*
 * Currency amount model (string value + currency code).
 */

import * as z from "zod/v4";

export type CurrencyAmount = {
  value: string;
  currency: string;
};

/** @internal */
export const CurrencyAmount$inboundSchema: z.ZodType<CurrencyAmount> = z.object({
  value: z.string(),
  currency: z.string(),
});
