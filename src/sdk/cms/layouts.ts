/*
 * CMS Layouts SDK.
 */

import { layoutsList } from "../../funcs/cms/layoutsList.js";
import { layoutsGet } from "../../funcs/cms/layoutsGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Layouts extends ClientSDK {
    async list(
        request?: operations.ListLayoutsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListLayoutsResponse> {
        return unwrapAsync(layoutsList(this, request, options));
    }

    async get(
        request: operations.GetLayoutRequest,
        options?: RequestOptions,
    ): Promise<operations.GetLayoutResponse> {
        return unwrapAsync(layoutsGet(this, request, options));
    }
}
