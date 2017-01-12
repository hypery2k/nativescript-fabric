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

    init(): void {
        if (application.android) {
            // configure logger
            application.android.on('activityStarted', activityEventData => {
                // Enable Fabric crash reporting
                io.fabric.sdk.android.Fabric.with(activityEventData.activity, [
                    // init Fabric with plugins
                    new com.crashlytics.android.Crashlytics(),
                    new com.crashlytics.android.answers.Answers()
                ]);
            });
            application.on('uncaughtError', args => {
                com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(args));
            });
        }
    }

    logLogin(method: string, success: boolean): void {
        let event: any = new com.crashlytics.android.answers.LoginEvent()
            .putMethod(method)
            .putSuccess(success);
        com.crashlytics.android.answers.Answers.getInstance().logLogin(event);
    }

    logContentView(id: string, name: string, type: string): void {
        let event: any = new com.crashlytics.android.answers.ContentViewEvent()
            .putContentName(name)
            .putContentType(type)
            .putContentId(id);
        com.crashlytics.android.answers.Answers.getInstance().logContentView(event);
    }

    logCustomEvent(withName: string, customAttributes: Map<String, String>): void {
        let event: any = new com.crashlytics.android.answers.CustomEvent(withName);
        if (!!customAttributes) {
            customAttributes.forEach((value: string, key: string) => {
                event.putCustomAttribute(key, value);
            });
        }
        com.crashlytics.android.answers.Answers.getInstance().logCustom(event);
    }

    logError(error: any, msg?: string): void {
        if (!!msg) {
            com.crashlytics.android.Crashlytics.getInstance().core.log('' + msg);
        }
        if (!error.android) {
            com.crashlytics.android.Crashlytics.getInstance().core.log(JSON.stringify(error));
        } else {
            com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(error));
        }
    }
}

/**
 * Create new singelton instance
 */
export const Fabric: Android = getInstance(CrashlyticsAndroidPlugin);
