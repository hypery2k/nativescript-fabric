/// <reference path="node_modules/tns-platform-declarations/tns-core-modules/ios/ios.d.ts" />

import * as application from 'application';
import { IOS, getInstance } from "./fabric.common";
import { FabricAppDelegate } from "./fabric.ios.appdelegate";
declare var Crashlytics: any, Answers: any;

class CrashlyticsIOSPlugin implements IOS {

    constructor() {
    }

    getErrorDetails(args: any): any {
        let error = args.ios;
        return error;
    }

    init(): void {
        if (application.ios) {
            application.ios.delegate = FabricAppDelegate;
        }
    }

    logLogin(method: string, success: boolean): void {
        Answers.logLoginWithMethod(method, success, null);
    }

    logContentView(id: string, name: string, type: string): void {
        Answers.logContentViewWithName(name, type, id, null);
    }

    logCustomEvent(withName: string, customAttributes: Map<String, String>): void {
        let attributes: Object = {}
        if (!!customAttributes) {
            customAttributes.forEach((value: string, key: string) => {
                attributes[key] = value;
            });
        }
        Answers.logCustomEventWithName(withName, attributes);
    }

    logError(error: any, msg?: string): void {
        if (!!msg) {
            Crashlytics.sharedInstance().setObjectValueForKey(msg, "msg");
        }
        if (!error.ios) {
            let nativeError: NSCoder = new NSCoder();
            nativeError.setValueForKey(error, "error");
            Crashlytics.sharedInstance().recordError(nativeError);
        } else {
            Crashlytics.sharedInstance().recordError(error);
        }
    }
}

/**
 * Create new singelton instance
 */
export const Fabric: IOS = getInstance(CrashlyticsIOSPlugin);
