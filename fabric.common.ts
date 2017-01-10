import { CrashlyticsPlugin } from './fabric.common.d';
var INSTANCE: CrashlyticsPlugin;

export interface CrashlyticsPlugin {
    /**
     * Load Plugin
     */
    init: Function;
    /**
     * Log an error with an optional message
     */
    log(error: any, msg?: string);
}

export interface Android extends CrashlyticsPlugin { }

export interface IOS extends CrashlyticsPlugin { }

export function getInstance(T: new () => CrashlyticsPlugin):CrashlyticsPlugin{
    if(!INSTANCE){
        INSTANCE = new T();
    }
    return INSTANCE;
}

