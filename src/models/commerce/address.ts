/*
 * Address model.
 */

import * as z from "zod/v4";

export type Address = {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  street?: string | null | undefined;
  number?: string | null | undefined;
  additional?: string | null | undefined;
  postalCode?: string | null | undefined;
  city?: string | null | undefined;
  region?: string | null | undefined;
  country?: string | null | undefined;
};

/** @internal */
export const Address$inboundSchema: z.ZodType<Address> = z.object({
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  number: z.string().nullable().optional(),
  additional: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
});
