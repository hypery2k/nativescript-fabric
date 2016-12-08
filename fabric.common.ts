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

export interface Android extends CrashlyticsPlugin {

}