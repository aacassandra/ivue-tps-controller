import {
  IndexModele,
  Geoposition,
  GeoUpdate,
  Coordinates,
  GeolocationOptions
} from "./cordova-plugin-modele";
import { Observable } from "rxjs";
export class GeolocationController {
  status = true;
  coords: Coordinates = {
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  };
  timestamp: number | null = null;
  plugin: IndexModele = {
    geolocation: {
      async getCurrentPosition(
        options?: GeolocationOptions
      ): Promise<Geoposition | PositionError> {
        let geo: GeoUpdate = new GeolocationController();
        return new Promise<Geoposition | PositionError>((resolve, reject) => {
          resolve(geo.getUpdate(options));
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
    }
  };

  getUpdate(options?: GeolocationOptions) {
    return new Promise((resolve, reject) => {
      document.addEventListener(
        "deviceready",
        () => {
          if (typeof navigator.geolocation === "undefined") {
            this.status = false;
          } else {
            this.status = true;
            navigator.geolocation.getCurrentPosition(
              res => {
                resolve(res);
              },
              err => {
                resolve(err);
              },
              options
            );
          }
        },
        false
      );
    });
  }
}

let PluginGeolocation: GeolocationController = new GeolocationController();
export default PluginGeolocation;
