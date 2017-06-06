// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from "nativescript-angular/platform-static";
import { Fabric } from 'nativescript-fabric';
import { AppModuleNgFactory } from "./app.module.ngfactory";

try {
  Fabric.init();
  platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);
  Fabric.logCustomEvent('Init done', null);
} catch (e) {
  Fabric.logError(e);
  throw e;
}
