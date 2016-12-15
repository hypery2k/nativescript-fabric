import * as application from 'application';
import { IOS } from "./fabric.common";
import { FabricAppDelegate } from "./fabric.ios.appdelegate";
declare var Crashlytics: any;

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


    log(error: any, msg?: string): void {
        if (!!msg) {
            Crashlytics.sharedInstance().setObjectValue(msg, "msg");
        }
        Crashlytics.sharedInstance().recordError(error);
    }
}

export var Fabric: IOS = new CrashlyticsIOSPlugin();
