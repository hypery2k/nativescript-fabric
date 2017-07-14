/// <reference path="node_modules/tns-platform-declarations/ios/ios.d.ts" />

import * as application from 'application';
import { NativeScriptError } from 'application';
import { IOS, getInstance } from "./fabric.common";
import { FabricAppDelegate } from "./fabric.appdelegate";
declare var Crashlytics: any, Answers: any;

class CrashlyticsIOSPlugin implements IOS {

  private initDone = false;

  constructor() {
    application.on(application.uncaughtErrorEvent, (args) => {
      if (application.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        this.logError(args);
      }
    });
  }

  getErrorDetails(args: any): any {
    let error = args.ios;
    return error;
  }

  init(): void {
    if (application.ios) {
      application.ios.delegate = FabricAppDelegate;
      this.initDone = true;
    }
  }

  logSignUp(method: string, success: boolean): void {
    if (this.initDone) {
      try {
        Answers.logSignUpWithMethod(method, success, null);
      } catch (e) {
        console.error('Unknown logging signup in Fabric', e);
      }
    }
  }

  logLogin(method: string, success: boolean): void {
    if (this.initDone) {
      try {
        Answers.logLoginWithMethod(method, success, null);
      } catch (e) {
        console.error('Unknown logging login in Fabric', e);
      }
    }
  }

  logContentView(id: string, name: string, type: string): void {
    if (this.initDone) {
      try {
        Answers.logContentViewWithName(name, type, id, null);
      } catch (e) {
        console.error('Unknown logging content view in Fabric', e);
      }
    }
  }

  logCustomEvent(withName: string, customAttributes: Map<String, String>): void {
    if (this.initDone) {
      try {
        let attributes: Object = {}
        if (!!customAttributes) {
          customAttributes.forEach((value: string, key: string) => {
            attributes[key] = value;
          });
        }
        Answers.logCustomEventWithName(withName, attributes);
      } catch (e) {
        console.error('Unknown logging custom event in Fabric', e);
      }
    }
  }

  logError(error: any, msg?: string): void {
    if (this.initDone) {
      try {
        if (!!msg) {
          Crashlytics.sharedInstance().setObjectValueForKey('' + msg, "msg");
        }
        if (!error.ios) {
          Crashlytics.sharedInstance().recordError({ domain: msg ? msg : 'error', code: 0, userInfo: null });
        } else {
          Crashlytics.sharedInstance().recordError(this.getErrorDetails(error));
        }
      } catch (e) {
        console.error('Unknown logging error in Fabric', e);
      }
    }
  }
}

/**
 * Create new singelton instance
 */
export const Fabric: IOS = getInstance(CrashlyticsIOSPlugin);
