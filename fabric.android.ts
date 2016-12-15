import * as application from 'application';
import { Android } from "./fabric.common";

declare var io: any, com: any;
class CrashlyticsAndroidPlugin implements Android {

    constructor() {
    }

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
            application.android.on('activityStarted', activityEventData => {
                // Enable Fabric crash reporting
                io.fabric.sdk.android.Fabric.with(activityEventData.activity, [new com.crashlytics.android.Crashlytics()]);
            });
            application.on('uncaughtError', args => {
                com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(args));
            });
        }
    }


    log(error: any, msg?: string): void {
        if (!!msg) {
            com.crashlytics.android.Crashlytics.getInstance().core.log(msg);
        }
        com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(error));
    }
}

export const Fabric: Android = new CrashlyticsAndroidPlugin()
