/*
 * SDK module: Commerce
 */

import { ClientSDK } from "../../lib/sdks.js";
import { CartItems } from "./cart-items.js";
import { Carts } from "./carts.js";
import { Categories } from "./categories.js";
import { Products } from "./products.js";

export class Commerce extends ClientSDK {
  private _cartItems?: CartItems;
  private _carts?: Carts;
  private _categories?: Categories;
  private _products?: Products;

  get cartItems(): CartItems {
    return (this._cartItems ??= new CartItems(this._options));
  }

  get carts(): Carts {
    return (this._carts ??= new Carts(this._options));
  }

  get categories(): Categories {
    return (this._categories ??= new Categories(this._options));
  }

  get products(): Products {
    return (this._products ??= new Products(this._options));
  }
}
