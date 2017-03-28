// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";
import { Fabric } from 'nativescript-fabric';

platformNativeScriptDynamic().bootstrapModule(AppModule);
try {
  Fabric.init();
platformNativeScriptDynamic().bootstrapModule(AppModule);
} catch (e) {
  Fabric.logError(e);
  throw e;
}