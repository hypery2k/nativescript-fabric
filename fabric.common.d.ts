export interface CrashlyticsPlugin {
    init: Function;
    logSignUp(method: string, success: boolean): any;
    logLogin(method: string, success: boolean): any;
    logContentView(id: string, name: string, type: string): any;
    logCustomEvent(withName: string, customAttributes: Map<String, String>): any;
    logError(error: any, msg?: string): any;
}
export interface Android extends CrashlyticsPlugin {
}
export interface IOS extends CrashlyticsPlugin {
}
export declare function getInstance(T: new () => CrashlyticsPlugin): CrashlyticsPlugin;
