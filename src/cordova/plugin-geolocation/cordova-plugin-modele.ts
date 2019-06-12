import { Observable } from "rxjs";

export interface GeoSuccess {
  onSuccess: {
    coords: {
      latitude: any;
      longitude: any;
      altitude: any;
      accuracy: any;
      altitudeAccuracy: any;
      heading: any;
      speed: any;
      timestamp: any;
    };
  };
}

export interface GeoError {
  onError: {
    code: string;
    message: string;
  };
}

export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface Geoposition {
  coords: Coordinates;
  timestamp: number | null;
}

export interface GeoUpdate {
  getUpdate(options?: GeolocationOptions): any;
}

export interface PositionError {
  code: number;
  message: string;
}

export interface GeolocationOptions {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
}

export interface PlgGeolocationModele {
  getCurrentPosition(
    options?: GeolocationOptions
  ): Promise<Geoposition | PositionError>;
  watchPosition(options?: GeolocationOptions): Observable<Geoposition>;
  clearWatch(watchId: number): any;
}

export interface IndexModele {
  geolocation: PlgGeolocationModele;
}
