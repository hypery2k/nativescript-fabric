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

Create a file fabric.json in the project root folder: 
```
{
    "apiKey": "",
    "apiSecret": ""
}
```
## Additional information

### Android 

For more details see [fabric.io/kits/android/crashlytics](https://fabric.io/kits/android/crashlytics/install).

### iOS

For more details see [fabric.io/kits/ios/crashlytics](https://fabric.io/kits/ios/crashlytics/manual-install?step=1).

## API

Init the plugin in your app (for angular apps use main.ts):

```
import {Fabric} from 'nativescript-fabric';
Fabric.init();
```

Afterwards you can use the instance methods for logging (general error logging is already added):
* `Fabric.logLogin(method: string, success: boolean);`
* `Fabric.logContentView(id: string, name: string, type: string)`
* `Fabric.logCustomEvent(withName: string, customAttributes: Map<String, String>)`
* `Fabric.logError(error: any, msg?: string)`
