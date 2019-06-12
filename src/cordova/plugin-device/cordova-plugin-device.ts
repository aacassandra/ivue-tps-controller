import { PlgDeviceModele } from "./cordova-plugin-modele";
declare var device: PlgDeviceModele;
export class ClassController {
  status = true;
  plugin: any;

  constructor() {
    document.addEventListener(
      "deviceready",
      () => {
        if (
          typeof device === "undefined" ||
          typeof device.cordova === "undefined"
        ) {
          this.status = false;
        } else {
          this.plugin = {
            device: {
              cordova: device.cordova,
              model: device.model,
              platform: device.platform,
              uuid: device.uuid,
              version: device.version,
              manufacturer: device.manufacturer,
              isVirtual: device.isVirtual,
              serial: device.serial
            }
          };
        }
      },
      false
    );
  }
}

let PluginDevice: ClassController = new ClassController();
export default PluginDevice;
