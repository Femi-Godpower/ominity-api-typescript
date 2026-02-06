/*
 * CMS Component model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type Component = {
    id: number;
    slug: string;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const Component$inboundSchema: z.ZodType<Component> = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "created_at": "createdAt",
        "updated_at": "updatedAt",
        "_links": "links",
    }) as Component;
});
