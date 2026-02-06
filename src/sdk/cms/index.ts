/*
 * SDK module: CMS
 */

import { ClientSDK } from "../../lib/sdks.js";
import { Components } from "./components.js";
import { Layouts } from "./layouts.js";
import { Pages } from "./pages.js";
import { Menus } from "./menus.js";

export { Components } from "./components.js";
export { Layouts } from "./layouts.js";
export { Pages } from "./pages.js";
export { Menus } from "./menus.js";

export class Cms extends ClientSDK {
    private _components?: Components;
    private _layouts?: Layouts;
    private _pages?: Pages;
    private _menus?: Menus;

    get components(): Components {
        return (this._components ??= new Components(this._options));
    }

    get layouts(): Layouts {
        return (this._layouts ??= new Layouts(this._options));
    }

    get pages(): Pages {
        return (this._pages ??= new Pages(this._options));
    }

    get menus(): Menus {
        return (this._menus ??= new Menus(this._options));
    }
}
