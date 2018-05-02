declare var Fabric: any,
  Crashlytics: any,
  Answers: any;
// TODO: Extend existing delegate if exists
export class FabricAppDelegate extends UIResponder implements UIApplicationDelegate {

  public static ObjCProtocols = [UIApplicationDelegate];

  public applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
    Fabric.with([Crashlytics, Answers]);
    return true;
  }

}
