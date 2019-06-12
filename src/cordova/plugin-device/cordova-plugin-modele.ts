export interface PlgDeviceModele {
  cordova: string | undefined;
  model: string | undefined;
  platform: string | undefined;
  uuid: string | undefined;
  version: string | undefined;
  manufacturer: string | undefined;
  isVirtual: string | undefined;
  serial: string | undefined;
}

export interface IndexModele {
  device: PlgDeviceModele;
}
