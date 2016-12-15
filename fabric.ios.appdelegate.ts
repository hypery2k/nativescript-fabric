/// <reference path="node_modules/tns-platform-declarations/tns-core-modules/ios/ios.d.ts" />

declare var Fabric: any,
    Crashlytics: any;

export class FabricAppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    public applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
        Fabric.with([Crashlytics.self]);
        return true;
    }

}