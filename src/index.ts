import _Vue from "vue";
import Controller, { ClassController } from "./controller";
export function IvuePlugTSP(Vue: typeof _Vue, options?: any): void {
  // Implements Plugins
  Vue.prototype.ionic = Controller;
}
//
declare module "vue/types/vue" {
  interface Vue {
    //Declare Plugins Modele
    ionic: ClassController;
  }
}
