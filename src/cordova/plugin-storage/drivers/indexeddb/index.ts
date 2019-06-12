import PluginConfigs from "../../../../configs/cordova-plugin-configs";

declare global {
  interface Window {
    indexedDB: any;
    mozIndexedDB: any;
    webkitIndexedDB: any;
    msIndexedDB: any;
  }

  export interface OPT {
    DB_NAME?: string;
    TB_NAME?: string;
    DRIVER?: string;
  }
}

let db: any;
let indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

export class ClassController {
  DB_NAME: any;
  TB_NAME: any;
  constructor() {}

  async init(data: OPT) {
    this.DB_NAME = data.DB_NAME;
    this.TB_NAME = data.TB_NAME;
    var request = indexedDB.open(this.DB_NAME, 2);
    let reqOnUpgrade = await this.onUpgrade(request);
    let reqOnError = await this.onError(request);
    let reqOnSuccess = await this.onSuccess(request);
    let reqOnDBError = await this.onDBStatus(reqOnSuccess);
  }

  async onUpgrade(request: any) {
    let dbu: any;
    let self = this;
    request.onupgradeneeded = function(event: any) {
      dbu = event.target.result;
      var objectStore = dbu.createObjectStore(self.TB_NAME, {
        keyPath: "key"
      });
    };
  }

  onError(request: any) {
    request.onerror = async function(event: any) {
      console.log(event);
    };
  }

  onSuccess(request: any) {
    return new Promise((resolve, reject) => {
      request.onsuccess = async function(event: any) {
        db = await event.target.result;
        console.log("onSuccess");
        resolve(db);
      };
    });
  }

  onDBStatus(dbe: any) {
    return new Promise((resolve, reject) => {
      dbe.onerror = function(event: any) {
        reject(event.target.errorCode);
      };
      dbe.onsuccess = function(event: any) {
        resolve(true);
      };
    });
  }

  async policy() {
    var request = indexedDB.open(this.DB_NAME, 2);
    let reqOnSuccess = await this.onSuccess(request);
    return;
  }

  async set(KEY: string, VALUE: string) {
    let callPolicy = await this.policy();
    let Data = {
      key: KEY,
      value: VALUE
    };
    // add, clear, count, delete, get, getAll, getAllKeys, getKey, put
    var request = await db
      .transaction([this.TB_NAME], "readwrite")
      .objectStore(this.TB_NAME)
      .add(Data);
    request.onerror = function(event: any) {
      console.log(event.target.error.message);
    };
    return;
  }

  async get(KEY: string) {
    let callPolicy = await this.policy();
    var request = await db
      .transaction([this.TB_NAME], "readonly")
      .objectStore(this.TB_NAME)
      .get(KEY);
    return new Promise((resolve, reject) => {
      request.onerror = function(event: any) {
        reject(event);
      };
      request.onsuccess = function(event: any) {
        resolve(request.result.value);
      };
    });
  }

  async remove(KEY: string) {
    let callPolicy = await this.policy();
    var request = await db
      .transaction([this.TB_NAME], "readwrite")
      .objectStore(this.TB_NAME)
      .delete(KEY);
    request.onerror = function(event: any) {
      console.log(event);
    };
    return;
  }

  async clear() {
    let callPolicy = await this.policy();
    var request = await db
      .transaction([this.TB_NAME], "readwrite")
      .objectStore(this.TB_NAME)
      .clear();
    request.onerror = function(event: any) {
      console.log(event);
    };
    return;
  }
}

let IndexedDB: ClassController = new ClassController();
export default IndexedDB;
