/*
 * CMS Layouts operations.
 */

import * as z from "zod/v4";

import { buildPaginated, Paginated } from "../pagination.js";
import { Layout, Layout$inboundSchema } from "../cms/layout.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListLayoutsRequest = {
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListLayoutsResponse = Paginated<Layout>;

/** @internal */
export const ListLayoutsRequest$outboundSchema: z.ZodType<
    ListLayoutsRequest
> = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListLayoutsResponse$inboundSchema: z.ZodType<
    ListLayoutsResponse
> = z.object({
    _embedded: z.object({
        layouts: z.array(Layout$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.layouts,
        v.count,
        v._links,
    )
);

export type GetLayoutRequest = {
    /**
     * Layout ID.
     */
    id: number;
};

export type GetLayoutResponse = Layout;

/** @internal */
export const GetLayoutRequest$outboundSchema: z.ZodType<
    GetLayoutRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const GetLayoutResponse$inboundSchema: z.ZodType<
    GetLayoutResponse
> = Layout$inboundSchema;
