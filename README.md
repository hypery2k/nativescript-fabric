# NativeScript Fabric Plugin ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![Greenkeeper badge](https://badges.greenkeeper.io/hypery2k/nativescript-fabric.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/hypery2k/nativescript-fabric.svg?branch=master)](https://travis-ci.org/hypery2k/nativescript-fabric)
[![npm version](https://badge.fury.io/js/nativescript-fabric.svg)](http://badge.fury.io/js/nativescript-fabric)
[![Maintainability](https://api.codeclimate.com/v1/badges/85a5fd560b331cd8922e/maintainability)](https://codeclimate.com/github/hypery2k/nativescript-fabric/maintainability)

Plugin is still **WIP**

[![NPM](https://nodei.co/npm/nativescript-fabric.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-fabric/)

<a name="donation"></a>
> Feel free to **donate**
>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=H8TR8246RCDJG">
> <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/>
> </img></a>
> Or donate Bitcoins: bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D
>
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D)
>
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)


# Usage




## Installation


Go to [Crashlytics](https://fabric.io/kits/ios/crashlytics/install) and pick of the needed API-Key and API-Secret:

![](etc/crashlytics_configuration.png)

Create a file fabric.json in the project root folder and add the API-Key and API-Secret: 

```
{
    "using_ios": true,
    "using_android": true,
    "api_key": "...",
    "api_secret": "..."
}
```

```
$ tns plugin add nativescript-fabric
```

Or if you want to use the development version (nightly build), which maybe not stable!:

```
$ tns plugin add nativescript-fabric@next
```

### Android

Add the API-Key to your AndroidManifest.xml:

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="__PACKAGE__" android:versionCode="385" android:versionName="1.0.14">
 ....
  <application android:name="com.tns.NativeScriptApplication" android:allowBackup="true" android:icon="@drawable/icon" android:label="@string/app_name" android:theme="@style/AppTheme">
    ...
    <meta-data android:name="io.fabric.ApiKey" android:value="**<API-KEY>**"/>
  </application>
</manifest>

```

### iOS
No further confiugration needed

## Additional information

### Android 

For more details see [fabric.io/kits/android/crashlytics](https://fabric.io/kits/android/crashlytics/install).

### iOS

For more details see [fabric.io/kits/ios/crashlytics](https://fabric.io/kits/ios/crashlytics/manual-install?step=1).

## API

Init the plugin in your app (for angular apps use main.ts):

```
import { Fabric } from 'nativescript-fabric';
Fabric.init();
```

Afterwards you can use the instance methods for logging (general error logging is already added):
* `Fabric.logSignUp(method: string, success: boolean);`
* `Fabric.logLogin(method: string, success: boolean);`
* `Fabric.logContentView(id: string, name: string, type: string)`
* `Fabric.logCustomEvent(withName: string, customAttributes: Map<String, String>)`
* `Fabric.logError(error: any, msg?: string)`


## Angular

```
import { FabricModule } from 'nativescript-fabric/angular';

NgModule({
  ...
  imports: [
    FabricModule.forRoot()
  ],

```
# Known Issues

## com.android.ide.common.process.ProcessException

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:transformClassesWithDexForF0F1F2F3F4F5Debug'.
> com.android.build.api.transform.TransformException: com.android.ide.common.process.ProcessException: java.util.concurrent.ExecutionException: com.android.dex.DexIndexOverflowException: Cannot merge new index 69013 into a non-jumbo instruction!nto a non-jumbo instruction!

```
set the following in your app.gradle:
```
android {
    ...
    dexOptions {
        jumboMode true
    }

}
```

## XML Parsing error

```
Error:/app/build/intermediates/res/merged/debug/values/com_crashlytics_build_id.xml uncompiled XML file passed as argument. Must be compiled first into .flat file.
```

Try adding:
```
android.enableAapt2 = false
```
to your `gradle.properties` file.
