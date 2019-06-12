import { PlgConfigsModele } from "../configs/cordova-plugin-modele";
import { PlgGeolocationModele } from "../cordova/plugin-geolocation/cordova-plugin-modele";
import { PlgDeviceModele } from "../cordova/plugin-device/cordova-plugin-modele";
import { PlgSplashscreenModele } from "../cordova/plugin-splashscreen/cordova-plugin-modele";
import { PlgStorageModele } from "../cordova/plugin-storage/cordova-plugin-modele";
export interface Modele {
  configs: PlgConfigsModele;
  device: PlgDeviceModele;
  geolocation: PlgGeolocationModele;
  splashscreen: PlgSplashscreenModele;
  storage: PlgStorageModele;
}
