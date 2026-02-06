/*
 * CMS Components operations.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Component, Component$inboundSchema } from "../cms/component.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListComponentsRequest = {
    /**
     * Filter by component ID.
     */
    filterId?: number | undefined;
    /**
     * Filter by component slug.
     */
    filterSlug?: string | undefined;
    /**
     * Filter by component name.
     */
    filterName?: string | undefined;
    /**
     * Include related resources.
     */
    include?: string | undefined;
    /**
     * Sort results.
     */
    sort?: string | undefined;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListComponentsResponse = Paginated<Component>;

/** @internal */
export const ListComponentsRequest$outboundSchema: z.ZodType<
    ListComponentsRequest
> = z.object({
    filterId: z.number().optional(),
    filterSlug: z.string().optional(),
    filterName: z.string().optional(),
    include: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
}).transform((v) => {
    return remap$(v, {
        filterId: "filter[id]",
        filterSlug: "filter[slug]",
        filterName: "filter[name]",
    });
});

/** @internal */
export const ListComponentsResponse$inboundSchema: z.ZodType<
    ListComponentsResponse
> = z.object({
    _embedded: z.object({
        components: z.array(Component$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.components,
        v.count,
        v._links,
    )
);

export type GetComponentRequest = {
    /**
     * Component ID.
     */
    id: number;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetComponentResponse = Component;

/** @internal */
export const GetComponentRequest$outboundSchema: z.ZodType<
    GetComponentRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetComponentResponse$inboundSchema: z.ZodType<
    GetComponentResponse
> = Component$inboundSchema;
