/*
 * CMS Menus SDK.
 */

import { menusList } from "../../funcs/cms/menusList.js";
import { menusGet } from "../../funcs/cms/menusGet.js";
import { ClientSDK, RequestOptions } from "../../lib/sdks.js";
import * as operations from "../../models/operations/index.js";
import { unwrapAsync } from "../../types/fp.js";

export class Menus extends ClientSDK {
    async list(
        request?: operations.ListMenusRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListMenusResponse> {
        return unwrapAsync(menusList(this, request, options));
    }

    async get(
        request: operations.GetMenuRequest,
        options?: RequestOptions,
    ): Promise<operations.GetMenuResponse> {
        return unwrapAsync(menusGet(this, request, options));
    }
}
