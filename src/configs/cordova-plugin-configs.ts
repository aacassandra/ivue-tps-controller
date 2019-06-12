import {
  IndexModele,
  PlgStorage,
  PlgStorageConfig
} from "./cordova-plugin-modele";

let Configs: PlgStorageConfig;

export class ConfigsController {
  plugin: IndexModele = {
    configs: {
      storage: {
        setConfigs(options: PlgStorageConfig) {
          Configs = options;
        },
        getConfig(): Promise<PlgStorageConfig> {
          let call = new ConfigsController();
          return new Promise<PlgStorageConfig>((resolve, reject) => {
            resolve(call.getConfig);
          });
        }
      }
    }
  };

  get getConfig() {
    return Configs;
  }
}

let PluginConfigs: ConfigsController = new ConfigsController();
export default PluginConfigs;
