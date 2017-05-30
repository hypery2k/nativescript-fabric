import { NgModule, ErrorHandler, ModuleWithProviders, Provider, NO_ERRORS_SCHEMA } from '@angular/core';

import { Fabric } from 'nativescript-fabric';
import { FabricErrorHandler } from './errorhandler';

@NgModule({
  declarations: [],
  providers: [],
  exports: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FabricModule {
  constructor() {
    Fabric.init();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FabricModule,
      providers: [
        { provide: ErrorHandler, useClass: FabricErrorHandler }
      ]
    };
  }
}
