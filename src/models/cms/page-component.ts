/*
 * CMS Page Component model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";

export type PageComponent = {
    resource: string;
    id: number;
    pageId: number;
    componentId: number;
    order: number;
    parameters: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    links?: HalLinks;
};

/** @internal */
export const PageComponent$inboundSchema: z.ZodType<PageComponent> = z.object({
    resource: z.string(),
    id: z.number(),
    pageId: z.number(),
    componentId: z.number(),
    order: z.number(),
    parameters: z.record(z.string(), z.any()),
    created_at: z.string(),
    updated_at: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => {
    return remap$(v, {
        "created_at": "createdAt",
        "updated_at": "updatedAt",
        "_links": "links",
    }) as PageComponent;
});
