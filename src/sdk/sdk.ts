
import { ClientSDK } from "../lib/sdks.js";
import { Cms } from "./cms/index.js";
import { Commerce } from "./commerce/index.js";
import { Http } from "./http.js";
import { Me } from "./me.js";
import { Settings } from "./settings/index.js";
import { Users } from "./users/index.js";
import type { SDKOptions } from "../lib/config.js";
import type {
  OminityModuleInput,
  OminityModules,
} from "./modules.js";

export type OminityOptions = SDKOptions & {
  modules?: Array<OminityModuleInput<Ominity>> | undefined;
};

export class Ominity extends ClientSDK {
  public readonly modules: OminityModules = {} as OminityModules;

  constructor(options: OminityOptions = {}) {
    const { modules, ...sdkOptions } = options;
    super(sdkOptions);

    if (modules) {
      for (const mod of modules) {
        this.use(mod);
      }
    }
  }

  use(mod: OminityModuleInput<Ominity>): this {
    const moduleDef = typeof mod === "function" ? mod() : mod;
    (this.modules as Record<string, unknown>)[moduleDef.name] = moduleDef
      .init(this);
    return this;
  }

  private _commerce?: Commerce;
  get commerce(): Commerce {
    return (this._commerce ??= new Commerce(this._options));
  }

  private _cms?: Cms;
  get cms(): Cms {
    return (this._cms ??= new Cms(this._options));
  }

  private _settings?: Settings;
  get settings(): Settings {
    return (this._settings ??= new Settings(this._options));
  }

  private _http?: Http;
  get http(): Http {
    return (this._http ??= new Http(this._options));
  }

  private _me?: Me;
  get me(): Me {
    return (this._me ??= new Me(this._options));
  }

  private _users?: Users;
  get users(): Users {
    return (this._users ??= new Users(this._options));
  }
}
