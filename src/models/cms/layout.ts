/*
 * CMS Layout model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Layout = {
    resource: string;
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const Layout$inboundSchema: z.ZodType<Layout> = z.object({
    resource: z.string(),
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as Layout;
});
