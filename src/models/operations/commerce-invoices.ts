/*
 * Commerce invoices operations.
 */

import * as z from "zod/v4";
import { Invoice, InvoicesListResponse } from "../commerce/invoice.js";

export type InvoicesListParams = {
    page?: number | undefined;
    limit?: number | undefined;
    include?: string | string[] | undefined;
    filter?: Record<string, unknown> | string | undefined;
    sort?: string | string[] | undefined;
};

export type InvoiceGetParams = {
    include?: string | string[] | undefined;
};

export type ListInvoicesRequest = InvoicesListParams;
export type ListInvoicesResponse = InvoicesListResponse;

export type GetInvoiceRequest = InvoiceGetParams & {
    id: number | string;
};

export type GetInvoiceResponse = Invoice;

/** @internal */
export const InvoicesListParams$outboundSchema: z.ZodType<
    InvoicesListParams
> = z.object({
    page: z.number().int().optional(),
    limit: z.number().int().optional(),
    include: z.union([z.string(), z.array(z.string())]).optional(),
    filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
    sort: z.union([z.string(), z.array(z.string())]).optional(),
}).loose();

/** @internal */
export const InvoiceGetParams$outboundSchema: z.ZodType<InvoiceGetParams> = z
    .object({
        include: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();

/** @internal */
export const GetInvoiceRequest$outboundSchema: z.ZodType<GetInvoiceRequest> =
    z.object({
        id: z.union([z.string(), z.number()]),
        include: z.union([z.string(), z.array(z.string())]).optional(),
    }).loose();
