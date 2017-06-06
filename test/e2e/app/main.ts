// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { Fabric } from 'nativescript-fabric';
import { AppModule } from "./app.module";

try {
  Fabric.init();
  platformNativeScriptDynamic().bootstrapModule(AppModule);
  Fabric.logCustomEvent('Init done', null);
} catch (e) {
  Fabric.logError(e);
  throw e;
}
