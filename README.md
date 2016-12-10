# NativeScript Fabric Plugin

[![Build Status](https://travis-ci.org/hypery2k/nativescript-fabric.svg?branch=master)](https://travis-ci.org/hypery2k/nativescript-fabric)
[![npm version](https://badge.fury.io/js/nativescript-fabric.svg)](http://badge.fury.io/js/nativescript-fabric)

Plugin is still **WIP**

> Feel free to **donate**
> 
> <a href='http://www.pledgie.com/campaigns/33053'><img alt='Click here to lend your support and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/33053.png?skin_name=chrome' border='0' /></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AGPGLZYNV6Y5S">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D).
> 
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

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
For more details see [fabric.io/kits/android/crashlytics](https://fabric.io/kits/android/crashlytics/install).

### iOS

Add a run script to your build phase:
```
"${PODS_ROOT}/Fabric/run" 88.. b1...
```

For more details see [fabric.io/kits/ios/crashlytics](https://fabric.io/kits/ios/crashlytics/manual-install?step=1).
