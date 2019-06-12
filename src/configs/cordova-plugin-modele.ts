export interface PlgStorageConfig {
  DB_NAME?: string;
  DRIVER?: string;
}

export interface PlgStorage {
  storage: PlgStorageConfig;
}

export interface PlgStorageMethods {
  setConfigs(options?: PlgStorageConfig): any;
  getConfig(): Promise<PlgStorageConfig>;
}

export interface PlgConfigsModele {
  storage: PlgStorageMethods;
}

export interface IndexModele {
  configs: PlgConfigsModele;
}
