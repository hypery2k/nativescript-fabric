import { NgModule, ErrorHandler, ModuleWithProviders, Provider } from '@angular/core';

import { Fabric } from '..';
import { FabricErrorHandler } from './errorhandler';

// init fabric
Fabric.init();

export function errorHandlerFactory(): ErrorHandler {
  return new FabricErrorHandler();
}

@NgModule({
  declarations: [],
  providers: [],
  exports: []
})
export class FabricModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FabricModule,
      providers: [
        { provide: ErrorHandler, useFactory: (errorHandlerFactory) }
      ]
    };
  }
}
