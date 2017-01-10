import * as application from 'application';
import { Android, getInstance } from "./fabric.common";

declare var io: any, com: any;

class CrashlyticsAndroidPlugin implements Android {

    constructor() {
    }


  /**
   * Extract error details for Android
   * @param args
   * @returns {customLaunchers.android|{base, platform}|boolean|{indeterminate, cancelable, max, progressNumberFormat, progressPercentFormat, progressStyle, secondaryProgress}|any}
   */
    getErrorDetails(args: any): any {
        let error = args.android;
        if (error.nativeException) {
            error = {
                name: error.name,
                message: error.message,
                stack: error.stackTrace
            };
        }
        return error;
    }

    /**
     * Init Fabric plugin
     */
    init(): void {
        if (application.android) {
            application.android.on('activityStarted', activityEventData => {
                // Enable Fabric crash reporting
                io.fabric.sdk.android.Fabric.with(activityEventData.activity, [new com.crashlytics.android.Crashlytics()]);
            });
            application.on('uncaughtError', args => {
                com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(args));
            });
        }
    }

    /**
     *
     * @param error
     * @param msg
     */
    log(error: any, msg?: string): void {
        if (!!msg) {
            com.crashlytics.android.Crashlytics.getInstance().core.log(msg);
        }
        if (!error.android) {
            com.crashlytics.android.Crashlytics.getInstance().core.log(error);
        } else {
            com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(error));
        }
    }
}

/**
 * Create new singelton instance
 */
export const Fabric: Android = getInstance(CrashlyticsAndroidPlugin);
