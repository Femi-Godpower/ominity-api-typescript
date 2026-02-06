/*
 * CMS Menus operations.
 */

import * as z from "zod/v4";
import { buildPaginated, Paginated } from "../pagination.js";
import { Menu, Menu$inboundSchema } from "../cms/menu.js";
import { HalLinks$inboundSchema } from "../hal.js";

export type ListMenusRequest = {
    /**
     * Page number.
     */
    page?: number | undefined;
    /**
     * Page limit.
     */
    limit?: number | undefined;
};

export type ListMenusResponse = Paginated<Menu>;

/** @internal */
export const ListMenusRequest$outboundSchema: z.ZodType<
    ListMenusRequest
> = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});

/** @internal */
export const ListMenusResponse$inboundSchema: z.ZodType<
    ListMenusResponse
> = z.object({
    _embedded: z.object({
        menus: z.array(Menu$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.menus,
        v.count,
        v._links,
    )
);

export type GetMenuRequest = {
    /**
     * Menu ID.
     */
    id: number;
};

export type GetMenuResponse = Menu;

/** @internal */
export const GetMenuRequest$outboundSchema: z.ZodType<
    GetMenuRequest
> = z.object({
    id: z.number(),
});

/** @internal */
export const GetMenuResponse$inboundSchema: z.ZodType<
    GetMenuResponse
> = Menu$inboundSchema;
