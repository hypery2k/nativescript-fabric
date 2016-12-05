# NativeScript Fabric Plugin

[![npm version](https://badge.fury.io/js/nativescript-fabric.svg)](http://badge.fury.io/js/nativescript-fabric)

# Usage

## Installation

```
$ tns plugin add nativescript-fabric
```

### Android

Add the following entries to your *app/App_Resources/App/Android.xml*
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <application
      android:allowBackup="true"
      android:icon="@mipmap/ic_launcher"
      android:label="@string/app_name"
      android:theme="@style/AppTheme" >
      ...
      </activity>
      <meta-data
          android:name="io.fabric.ApiKey"
          android:value="88..."
      />
  </application>
  <!-- ensure to have this permissions set: -->
  <uses-permission android:name="android.permission.INTERNET" />
</manifest>
```
For more details see [https://fabric.io/kits/android/crashlytics/install](fabric.io/kits/android/crashlytics/install).

### iOS

Add a run script to your build phase:
```
"${PODS_ROOT}/Fabric/run" 88.. b1...
```

For more details see [https://fabric.io/kits/ios/crashlytics/manual-install?step=1](fabric.io/kits/ios/crashlytics/manual-install?step=1).
