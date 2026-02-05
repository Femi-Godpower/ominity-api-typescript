/*
 * Commerce Invoices SDK.
 */

import { invoicesGet } from "../../funcs/commerce/invoicesGet.js";
import { invoicesList } from "../../funcs/commerce/invoicesList.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Invoices extends ClientSDK {
    /**
     * List invoices.
     */
    async list(
        request?: operations.InvoicesListParams | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListInvoicesResponse> {
        return unwrapAsync(invoicesList(
            this,
            request,
            options,
        ));
    }

    /**
     * Get invoice.
     */
    async get(
        request: operations.GetInvoiceRequest,
        options?: RequestOptions,
    ): Promise<operations.GetInvoiceResponse> {
        return unwrapAsync(invoicesGet(
            this,
            request,
            options,
        ));
    }
}
