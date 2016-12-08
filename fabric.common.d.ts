export interface CrashlyticsPlugin {
    init: Function;
    log(error: any, msg?: string): any;
}
export interface Android extends CrashlyticsPlugin {
}
