export interface CrashlyticsPlugin {
    /**
     * Load Plugin
     */
    init: Function;
}

export interface Android extends CrashlyticsPlugin {

}