import { ErrorHandler, NgZone } from '@angular/core';
export declare class FabricErrorHandler implements ErrorHandler {
    private ngZone;
    constructor(ngZone: NgZone);
    handleError(err: any): void;
}
