
declare var Crashlytics: any, Fabric: any, UIResponder: any,UIResponder;

export class FabricAppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    public applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
         Fabric.with([Crashlytics.self]);
    }

}