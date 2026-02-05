/*
 * Invoice model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "../../lib/primitives.js";
import * as openEnums from "../../types/enums.js";
import { OpenEnum } from "../../types/enums.js";
import { Address, Address$inboundSchema } from "./address.js";
import { CurrencyAmount, CurrencyAmount$inboundSchema } from "../common/amount.js";
import { HalLinks, HalLinks$inboundSchema } from "../hal.js";
import { buildPaginated, Paginated } from "../pagination.js";

export const InvoiceStatus = {
    Paid: "paid",
    Credited: "credited",
    Open: "open",
    Overdue: "overdue",
    Voided: "voided",
    Draft: "draft",
} as const;
export type InvoiceStatus = OpenEnum<typeof InvoiceStatus>;

export type Invoice = {
    resource: string;
    id: number;
    customerId: number;
    number: string;
    status: InvoiceStatus;
    email: string;
    companyName: string;
    companyVat: string;
    billingAddress: Address;
    subtotalAmount: CurrencyAmount;
    discountAmount: CurrencyAmount;
    vatAmount: CurrencyAmount;
    totalAmount: CurrencyAmount;
    amountPaid: CurrencyAmount;
    isTaxExempt: boolean;
    notes: string;
    invoicedAt: string;
    dueAt: string;
    paidAt: string;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks;
};

/** @internal */
export const InvoiceStatus$inboundSchema: z.ZodType<InvoiceStatus, unknown> = openEnums
    .inboundSchema(InvoiceStatus);

/** @internal */
export const Invoice$inboundSchema: z.ZodType<Invoice> = z.object({
    resource: z.string(),
    id: z.number(),
    customerId: z.number(),
    number: z.string(),
    status: InvoiceStatus$inboundSchema,
    email: z.string(),
    companyName: z.string(),
    companyVat: z.string(),
    billingAddress: Address$inboundSchema,
    subtotalAmount: CurrencyAmount$inboundSchema,
    discountAmount: CurrencyAmount$inboundSchema,
    vatAmount: CurrencyAmount$inboundSchema,
    totalAmount: CurrencyAmount$inboundSchema,
    amountPaid: CurrencyAmount$inboundSchema,
    isTaxExempt: z.boolean(),
    notes: z.string(),
    invoicedAt: z.string(),
    dueAt: z.string(),
    paidAt: z.string(),
    updatedAt: z.string(),
    createdAt: z.string(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) => remap$(v, { _links: "links" }) as Invoice);

export type InvoicesListResponse = Paginated<Invoice>;

/** @internal */
export const InvoicesListResponse$inboundSchema: z.ZodType<
    InvoicesListResponse
> = z.object({
    _embedded: z.object({
        invoices: z.array(Invoice$inboundSchema),
    }),
    count: z.number(),
    _links: HalLinks$inboundSchema.optional(),
}).transform((v) =>
    buildPaginated(
        v._embedded.invoices,
        v.count,
        v._links,
    )
);
