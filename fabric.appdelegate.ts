/// <reference path="node_modules/tns-platform-declarations/ios/ios.d.ts" />

declare var Fabric: any,
    Crashlytics: any,
    Answers: any;

export class FabricAppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    public applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<any, any>): boolean {
        Fabric.with([Crashlytics, Answers]);
        return true;
    }

}