//cordova-plugin-configs
import {
  PlgConfigsModele,
  PlgStorage,
  PlgStorageConfig
} from "../configs/cordova-plugin-modele";
import { ConfigsController } from "../configs/cordova-plugin-configs";

//cordova-plugin-device
import { PlgDeviceModele } from "../cordova/plugin-device/cordova-plugin-modele";
//cordova-plugin-geolocation
import {
  Geoposition,
  GeolocationOptions,
  PlgGeolocationModele
} from "../cordova/plugin-geolocation/cordova-plugin-modele";
import { GeolocationController } from "../cordova/plugin-geolocation/cordova-plugin-geolocation";
//cordova-plugin-splashscreen
import { PlgSplashscreenModele } from "../cordova/plugin-splashscreen/cordova-plugin-modele";
//cordova-plugin-storage
import { PlgStorageModele } from "../cordova/plugin-storage/cordova-plugin-modele";
import { StorageController } from "../cordova/plugin-storage/cordova-plugin-storage";
//other dependencies
import { Observable } from "rxjs";
export class ClassController {
  //cordova-plugin-configs
  configs: PlgConfigsModele = {
    storage: {
      setConfigs(options: PlgStorageConfig) {},
      getConfig(plugins?: string): Promise<PlgStorageConfig> {
        let call = new ConfigsController();
        return new Promise<PlgStorageConfig>((resolve, reject) => {
          resolve(call.getConfig);
        });
      }
    }
  };

  //cordova-plugin-device
  device: PlgDeviceModele = {
    cordova: "",
    model: "",
    platform: "",
    uuid: "",
    version: "",
    manufacturer: "",
    isVirtual: "",
    serial: ""
  };

  //cordova-plugin-geolocation
  geolocation: PlgGeolocationModele = {
    getCurrentPosition(): Promise<Geoposition> {
      let geo: Geoposition = new GeolocationController();
      return new Promise<Geoposition>((resolve, reject) => {
        resolve(geo);
      });
    },
    watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
      return new Observable<Geoposition>((observer: any) => {
        const watchId = navigator.geolocation.watchPosition(
          observer.next.bind(observer),
          observer.next.bind(observer),
          options
        );
        return () => navigator.geolocation.clearWatch(watchId);
      });
    },
    clearWatch(watchId: number) {
      return navigator.geolocation.clearWatch(watchId);
    }
  };

  //cordova-plugin-splashscreen
  splashscreen: PlgSplashscreenModele = {
    show() {},
    hide() {}
  };

  //cordova-plugin-storage
  storage: PlgStorageModele = {
    set() {},
    async get(KEY: string): Promise<any> {
      let call = new StorageController();
      let res = await call.onGet(KEY);
      return new Promise<any>((resolve, reject) => {
        resolve(res);
      });
    },
    remove(KEY: string) {
      let call = new StorageController();
      call.onRemove(KEY);
    },
    clear() {}
  };

  constructor() {}
}
//
let Data: ClassController = new ClassController();
export default Data;
