import { ErrorHandler } from '@angular/core';
/**
 * @name FabricErrorHandler
 * @description
 * The `FabricErrorHandler` intercepts the default `Console` error handling
 * and reports displays runtime errors to Fabric.io
 *
 *
 * ### FabricErrorHandler Example
 *
 * ```typescript
 * import { NgModule, ErrorHandler } from '@angular/core';
 * import { FabricErrorHandler } from 'nativescript-fabric';
 *
 * @NgModule({
 *   providers: [{ provide: ErrorHandler, useClass: FabricErrorHandler }]
 * })
 * class AppModule {}
 * ```
 *
 *
 * ### Custom Error Handlers
 *
 * Custom error handlers can be built to replace the default, or extend this
 * error handler.
 *
 * ```typescript
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(err: any): void {
 *     // do something with the error
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{ provide: ErrorHandler, useClass: MyErrorHandler }]
 * })
 * class AppModule {}
 * ```
 *
 * More information about Angular's [`ErrorHandler`](https://angular.io/docs/ts/latest/api/core/index/ErrorHandler-class.html).
 */
export declare class FabricErrorHandler extends ErrorHandler {
    constructor();
    /**
     * @internal
     */
    handleError(err: any): void;
}
