/*
 * CMS Page model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Page = {
    resource: string;
    id: number;
    slug: string;
    title: string;
    description: string;
    type: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const Page$inboundSchema: z.ZodType<Page> = z.object({
    resource: z.string(),
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.string(),
    published: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "created_at": "createdAt",
        "updated_at": "updatedAt",
        "_links": "links",
    }) as Page;
});
