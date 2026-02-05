/*
 * Route model.
 */

import * as z from "zod/v4";

export type RouteParameters = Record<string, string | number>;

export type Route = {
  resource: string;
  name: string;
  locale: string;
  parameters: RouteParameters;
};

/** @internal */
export const RouteParameters$inboundSchema: z.ZodType<RouteParameters> = z
  .record(
    z.string(),
    z.union([z.string(), z.number()]),
  );

/** @internal */
export const Route$inboundSchema: z.ZodType<Route> = z.object({
  resource: z.string(),
  name: z.string(),
  locale: z.string(),
  parameters: RouteParameters$inboundSchema,
});
