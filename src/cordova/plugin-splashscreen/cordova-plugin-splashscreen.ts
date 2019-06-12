export interface Methods {
  show(): any;
  hide(): any;
}
export interface Navigator {
  splashscreen: Methods;
}
declare var navigator: Navigator;
import { IndexModele } from "./cordova-plugin-modele";
export class SplashscreenController {
  status = true;
  plugin: IndexModele = {
    splashscreen: {
      show() {
        let show = new SplashscreenController();
        show.getShow();
      },
      hide() {
        let show = new SplashscreenController();
        show.getHide();
      }
    }
  };

  getShow() {
    document.addEventListener(
      "deviceready",
      () => {
        navigator.splashscreen.show();
      },
      false
    );
  }

  getHide() {
    document.addEventListener(
      "deviceready",
      () => {
        navigator.splashscreen.hide();
      },
      false
    );
  }
}

let PluginSplashscreen: SplashscreenController = new SplashscreenController();
export default PluginSplashscreen;
