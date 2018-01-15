export interface CrashlyticsPlugin {
  /**
   * Load Plugin
   */
  init: Function;

  /**
   * Track signup events in your app.
   * @param method of the signup
   * @param success suggest if signup was true
   */
  logSignUp(method: string, success: boolean);

  /**
   * Track login events in your app.
   * @param method of the login
   * @param success suggest if login was true
   */
  logLogin(method: string, success: boolean);

  /**
   * Track content view events in your app.
   * @param id to use for view
   * @param name to use for view
   * @param type of the view
   */
  logContentView(id: string, name: string, type: string);

  /**
   * Track custom events in your app.
   * @param withName name to log the event
   * @param customAttributes to log
   */
  logCustomEvent(withName: string, customAttributes: Map<String, String>);

  /**
   * Log an error with an optional message
   * @param error to log, canbe an native error or a object
   * @param msg additional message
   */
  logError(error: any, msg?: string);
}

export const Fabric: CrashlyticsPlugin;
