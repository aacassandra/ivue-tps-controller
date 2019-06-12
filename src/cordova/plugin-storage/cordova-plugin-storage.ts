import { IndexModele } from "./cordova-plugin-modele";
import PluginConfigs from "../../configs/cordova-plugin-configs";
import IndexedDB from "./drivers/indexeddb";
import LocalStorage from "./drivers/localstorage";
import SessionStorage from "./drivers/sessionstorage";
import SQLite from "./drivers/sqlite";
declare global {
  export interface Config {
    DB_NAME?: string;
    DRIVER?: string;
  }

  export interface OPT {
    DB_NAME?: string;
    TB_NAME?: string;
    DRIVER?: string;
  }
}

let opt: OPT = {
  DB_NAME: "",
  TB_NAME: "",
  DRIVER: ""
};
let CONFIG: Config;
let DRIVER: any;
export class StorageController {
  plugin: IndexModele = {
    storage: {
      async set(KEY: string, VALUE: any) {
        let call = new StorageController();
        await call.onSet(KEY, VALUE);
        return;
      },
      async get(KEY: string): Promise<any> {
        let call = new StorageController();
        let res = await call.onGet(KEY);
        return new Promise<any>((resolve, reject) => {
          resolve(res);
        });
      },
      async remove(KEY: string) {
        let call = new StorageController();
        await call.onRemove(KEY);
        return;
      },
      async clear() {
        let call = new StorageController();
        await call.onClear();
        return;
      }
    }
  };
  constructor() {
    this.init();
  }

  async policy() {
    CONFIG = await PluginConfigs.plugin.configs.storage.getConfig();
    if (CONFIG == undefined) {
      return false;
    }
    DRIVER = CONFIG.DRIVER;
    DRIVER = DRIVER.toLowerCase();
    return;
  }

  async init() {
    await this.policy();
    if (CONFIG != undefined) {
      opt.DB_NAME = CONFIG.DB_NAME;
      opt.TB_NAME = "_" + CONFIG.DB_NAME;
      opt.DRIVER = CONFIG.DRIVER;
      if (
        DRIVER == "indexeddb" ||
        DRIVER == "localstorage" ||
        DRIVER == "sessionstorage" ||
        DRIVER == "sqlite"
      ) {
        if (DRIVER == "indexeddb") {
          IndexedDB.init(opt);
        } else if (DRIVER == "localstorage") {
          //Ignored
        } else if (DRIVER == "sessionstorage") {
          //Ignored
        } else if (DRIVER == "sqlite") {
          SQLite.init(opt);
        }
      } else {
        console.log(
          "Please choose one of (indexeddb,localstorage,sessionstorage,sqlite)"
        );
      }
    }
  }

  async onSet(KEY: string, VALUE: any) {
    await this.policy();
    if (DRIVER == "indexeddb") {
      await IndexedDB.set(KEY, VALUE);
      return;
    } else if (DRIVER == "localstorage") {
      await LocalStorage.set(KEY, VALUE);
      return;
    } else if (DRIVER == "sessionstorage") {
      await SessionStorage.set(KEY, VALUE);
      return;
    } else if (DRIVER == "sqlite") {
      await SQLite.set(KEY, VALUE);
      return;
    }
  }

  async onGet(KEY: string) {
    await this.policy();
    if (DRIVER == "indexeddb") {
      let res = await IndexedDB.get(KEY);
      return res;
    } else if (DRIVER == "localstorage") {
      let res = await LocalStorage.get(KEY);
      return res;
    } else if (DRIVER == "sessionstorage") {
      let res = await SessionStorage.get(KEY);
      return res;
    } else if (DRIVER == "sqlite") {
      let res = await SQLite.get(KEY);
      return res;
    }
  }

  async onRemove(KEY: string) {
    await this.policy();
    if (DRIVER == "indexeddb") {
      await IndexedDB.remove(KEY);
      return;
    } else if (DRIVER == "localstorage") {
      await LocalStorage.remove(KEY);
      return;
    } else if (DRIVER == "sessionstorage") {
      await SessionStorage.remove(KEY);
      return;
    } else if (DRIVER == "sqlite") {
      await SQLite.remove(KEY);
      return;
    }
  }

  async onClear() {
    await this.policy();
    if (DRIVER == "indexeddb") {
      await IndexedDB.clear();
      return;
    } else if (DRIVER == "localstorage") {
      await LocalStorage.clear();
      return;
    } else if (DRIVER == "sessionstorage") {
      await SessionStorage.clear();
      return;
    } else if (DRIVER == "sqlite") {
      await SQLite.clear();
      return;
    }
  }
}

let PluginStorage: StorageController = new StorageController();
export default PluginStorage;
