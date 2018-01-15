import * as application from 'application';
import { Android, getInstance } from "./fabric-common";
import { stringify } from "./utils/helper";

declare var io: any, com: any, android: any;

class CrashlyticsAndroidPlugin implements Android {

  private initDone = false;

  constructor() {
  }


  /**
   * Extract error details for Android
   * @param args
   * @returns {customLaunchers.android|{base, platform}|boolean|{indeterminate, cancelable, max, progressNumberFormat, progressPercentFormat, progressStyle, secondaryProgress}|any}
   */
  getErrorDetails(args: any): any {
    let error = args.android;
    if (!error || !error.nativeException) {
      return {
        name: error.name || 'Error',
        nativeException: error.nativeException,
        message: error.message || JSON.stringify(error),
        stackTrace: error.stackTrace || null,
        stack: error.stack || null
      };
    } else {
      return error.nativeException;
    }
  }

  init(): void {
    try {
      if (application.android) {
        console.info('Fabric: Starting configuring Android platform');
        application.android.on('activityStarted', activityEventData => {
          console.info('Fabric: Activating Fabric kits');
          // Enable Fabric crash reporting
          io.fabric.sdk.android.Fabric.with(new io.fabric.sdk.android.Fabric.Builder(activityEventData.activity)
            .kits([
              // init Fabric with plugins
              new com.crashlytics.android.Crashlytics(),
              new com.crashlytics.android.answers.Answers()
            ])
            .debuggable(false)
            .build()
          );
          this.initDone = true;
          console.info('Fabric: Init done');
        });
        application.on('uncaughtError', args => {
          if (!args.android) {
            let msg = args.toString();
            try {
              msg = stringify(args);
            } catch (ignored) {

            }
            com.crashlytics.android.Crashlytics.getInstance().core.log(android.util.Log.ERROR, 'ERROR', msg);
          } else {
            com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(args));
          }
        });
      }
    } catch (e) {
      console.error('Unknown error during init of Fabric', e);
    }
  }

  logSignUp(method: string, success: boolean): void {
    if (this.initDone) {
      try {
        let event: any = new com.crashlytics.android.answers.SignUpEvent()
          .putMethod(method)
          .putSuccess(success);
        com.crashlytics.android.answers.Answers.getInstance().logSignUp(event);
      } catch (e) {
        console.error('Unknown logging signup in Fabric', e);
      }
    }
  }

  logLogin(method: string, success: boolean): void {
    if (this.initDone) {
      try {
        let event: any = new com.crashlytics.android.answers.LoginEvent()
          .putMethod(method)
          .putSuccess(success);
        com.crashlytics.android.answers.Answers.getInstance().logLogin(event);
      } catch (e) {
        console.error('Unknown logging login in Fabric', e);
      }
    }
  }

  logContentView(id: string, name: string, type: string): void {
    if (this.initDone) {
      try {
        let event: any = new com.crashlytics.android.answers.ContentViewEvent()
          .putContentName(name)
          .putContentType(type)
          .putContentId(id);
        com.crashlytics.android.answers.Answers.getInstance().logContentView(event);
      } catch (e) {
        console.error('Unknown logging content view in Fabric', e);
      }
    }
  }

  logCustomEvent(withName: string, customAttributes: Map<String, String>): void {
    if (this.initDone) {
      try {
        let event: any = new com.crashlytics.android.answers.CustomEvent(withName);
        if (!!customAttributes) {
          customAttributes.forEach((value: string, key: string) => {
            event.putCustomAttribute(key, value);
          });
        }
        com.crashlytics.android.answers.Answers.getInstance().logCustom(event);
      } catch (e) {
        console.error('Unknown logging custom event in Fabric', e);
      }
    }
  }

  logError(error: any, msg?: string): void {
    if (this.initDone) {
      try {
        if (!error.android) {
          if (!!msg) {
            com.crashlytics.android.Crashlytics.getInstance().core.log(android.util.Log.ERROR, 'ERROR', msg);
          }
          if (error.toString) {
            com.crashlytics.android.Crashlytics.getInstance().core.log(android.util.Log.ERROR, 'ERROR', error.toString());
          } else {
            com.crashlytics.android.Crashlytics.getInstance().core.log(JSON.stringify(error));
          }
        } else {
          com.crashlytics.android.Crashlytics.getInstance().core.logException(this.getErrorDetails(error));
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
export const Fabric: Android = getInstance(CrashlyticsAndroidPlugin);

