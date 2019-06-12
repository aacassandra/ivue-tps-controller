export interface PlgOptions {
  DB_NAME?: string;
  TB_NAME?: string;
  DRIVER?: string;
}

export interface PlgStorageModele {
  set(key: string, value: any): any;
  get(key: string): Promise<any>;
  remove(key: string): any;
  clear(): void;
}

export interface IndexModele {
  storage: PlgStorageModele;
}
