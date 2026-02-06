/*
 * CMS Menu model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Menu = {
    resource: string;
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const Menu$inboundSchema: z.ZodType<Menu> = z.object({
    resource: z.string(),
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "_links": "links",
    }) as Menu;
});
