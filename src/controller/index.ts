import { Modele } from "./modele";
import Data from "./data";
import PluginConfigs from "../configs/cordova-plugin-configs";
import PluginDevice from "../cordova/plugin-device/cordova-plugin-device";
import PluginGeolocation from "../cordova/plugin-geolocation/cordova-plugin-geolocation";
import PluginSplashscreen from "../cordova/plugin-splashscreen/cordova-plugin-splashscreen";
import PluginStorage from "../cordova/plugin-storage/cordova-plugin-storage";
export class ClassController {
  plugin: Modele = Data;
  constructor() // plugDevice:PluginDeviceController
  {
    document.addEventListener(
      "deviceready",
      () => {
        this.plugin.configs = PluginConfigs.plugin.configs;
        this.plugin.device = PluginDevice.plugin.device;
        this.plugin.geolocation = PluginGeolocation.plugin.geolocation;
        this.plugin.splashscreen = PluginSplashscreen.plugin.splashscreen;
        this.plugin.storage = PluginStorage.plugin.storage;
      },
      false
    );
  }
}

let Controller: ClassController = new ClassController();
export default Controller;
