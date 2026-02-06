/*
 * CMS Pages operations.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import { buildPaginated, Paginated } from "../pagination.js";
import { Page, Page$inboundSchema } from "../cms/page.js";
import { PageComponent, PageComponent$inboundSchema } from "../cms/page-component.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListPagesRequest = {
    /**
     * Filter by page slug.
     */
    filterSlug?: string | undefined;
    /**
     * Filter by published status.
     */
    filterPublished?: boolean | undefined;
    /**
     * Include related resources.
     */
    include?: string | undefined;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListPagesResponse = Paginated<Page>;

/** @internal */
export const ListPagesRequest$outboundSchema: z.ZodType<
    ListPagesRequest
> = z.object({
    filterSlug: z.string().optional(),
    filterPublished: z.boolean().optional(),
    include: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
}).transform((v) => {
    return remap$(v, {
        filterSlug: "filter[slug]",
        filterPublished: "filter[published]",
    });
});

/** @internal */
export const ListPagesResponse$inboundSchema: z.ZodType<
    ListPagesResponse
> = z.object({
    _embedded: z.object({
        pages: z.array(Page$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.pages,
        v.count,
        v._links,
    )
);

export type GetPageRequest = {
    /**
     * Page ID.
     */
    id: number;
    /**
     * Include related resources.
     */
    include?: string | undefined;
};

export type GetPageResponse = Page;

/** @internal */
export const GetPageRequest$outboundSchema: z.ZodType<
    GetPageRequest
> = z.object({
    id: z.number(),
    include: z.string().optional(),
});

/** @internal */
export const GetPageResponse$inboundSchema: z.ZodType<
    GetPageResponse
> = Page$inboundSchema;

export type ListPageComponentsRequest = {
    /**
     * Page ID.
     */
    id: number;
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListPageComponentsResponse = Paginated<PageComponent>;

/** @internal */
export const ListPageComponentsRequest$outboundSchema: z.ZodType<
    ListPageComponentsRequest
> = z.object({
    id: z.number(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListPageComponentsResponse$inboundSchema: z.ZodType<
    ListPageComponentsResponse
> = z.object({
    _embedded: z.object({
        page_components: z.array(PageComponent$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.page_components,
        v.count,
        v._links,
    )
);
