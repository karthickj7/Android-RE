 /* ----------- Build Values -----------------*/
 const _MODEL = 'GT-I9100';
 const _DEVICE = 'a50';
 const _BOARD = 'smdk4210';
 const _PRODUCT = 'a50';
 const _HARDWARE = 'exynos9610';
 const _FINGERPRINT = 'samsung/a50dd/a50:10/QP1A.190711.020/A505FDDS5BTJ8:user/release-keys';
 const _DISPLAY_ID = 'QP1A.190711.020.A505FDDS5BTJ8';
 const _MANUFACTURER = 'samsung';
 const _BOOTLOADER = 'A505FDDS5BTJ8';
 const _BRAND = 'samsung';
 const _HOST = 'SWDH7015';
 const _TAGS = 'release-keys';
 const _TYPE = 'user';
 const _ARCH = 'arm64-v8a,armeabi-v7a,armeabi';
 const _BASEBAND = 'A505FXXS5BTIB,A505FXXS5BTIB';
 const _USER = 'dpi';
 const _CHARACTERISTICS = 'phone';
 const _SERIAL_NO = 'RZ8M605TCRK';



 /* ----------- Build Values End -----------------*/

 /* ----------- Util Functions -----------------*/

 const colors = {
     colorize: (str, cc) => `\x1b${cc}${str}\x1b[0m`,
     red: str => colors.colorize(str, '[31m'),
     green: str => colors.colorize(str, '[32m'),
     yellow: str => colors.colorize(str, '[33m'),
     blue: str => colors.colorize(str, '[34m'),
     magenta: str => colors.colorize(str, '[35m'),
     bgMagenta: str => colors.colorize(str, '[45m'),
     magentaBright: str => colors.colorize(str, '[95m'),
     cyan: str => colors.colorize(str, '[36m'),
     white: str => colors.colorize(str, '[37m'),
     dim: str => colors.colorize(str, '[2m'),
     grey: str => colors.colorize(str, '[90m')
 };


 function colourLogs(methods, retval) {
     console.log(`I: [${colors.magentaBright(methods)}] ${colors.dim('--->')} ${colors.cyan(retval)}`);
 }

 function byPassLogs(methods, original, replaced) {
     console.log(`I: [${colors.magentaBright(methods)}] ${colors.dim("replaced")} ${colors.red(original)} ${colors.dim("with")} ${colors.green(replaced)}`);
 }

 function returnLogs(methods, str, retval) {
     console.log(`I: [${colors.magentaBright(methods)}] ${str} ---> ${retval}`);
 }

 function byteArrayToString(input) {
     var buffer = Java.array('byte', input);
     var result = "";
     for (var i = 0; i < buffer.length; ++i) {
         if (buffer[i] > 31 && buffer[i] < 127)
             result += (String.fromCharCode(buffer[i]));
         else result += ' ';
     }
     return result;
 };

 function printBacktrace() {
     Java.perform(function() {
         var JLog = Java.use('android.util.Log'),
             JException = Java.use('java.lang.Exception');
         // getting stacktrace by throwing an exception
         console.log(JLog.getStackTraceString(JException.$new()));
     });
 };

 function getContext() {
     return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
 }

 function getPackageName() {
     return getContext().getPackageName();
 }

 function getStr(addr) {
    if (typeof addr == "number") {
        addr = ptr(addr);
    }
    return Memory.readUtf8String(addr);
}

function putStr(addr, str) {
    if (typeof addr == "number") {
        addr = ptr(addr);
    }
    return Memory.writeUtf8String(addr, str);
}

 /* ----------- Util Functions End -----------------*/

 /* ----------- Class Declarations -----------------*/
 try {

     var Runtime = Java.use('java.lang.Runtime');
     var System = Java.use('java.lang.System');
     var settingsGlobal = Java.use('android/provider/Settings$Global');
     var settingsSecure = Java.use('android.provider.Settings$Secure');
     var NetworkInfo = Java.use('android.net.NetworkInfo');
     // var Process = Java.use('android.os.Process');
     var AssetManager = Java.use("android.content.res.AssetManager");
     var Resources = Java.use("android.content.res.Resources");
     var Socket = Java.use("java.net.Socket");
     var URL = Java.use('java.net.URL');
     var androidNetUrl = Java.use('android.net.Uri');
     var WebView = Java.use("android.webkit.WebView");
     var TelephonyManager = Java.use('android.telephony.TelephonyManager');
 } catch (error) {

 }
 /* ----------- Class Declarations End -----------------*/

 /* ----------- Bypass Functions -----------------*/

 function bypassBuildValues() {
     var buildProperties = Java.use('android.os.Build');
     buildProperties.MODEL.value = _MODEL;
     buildProperties.DEVICE.value = _DEVICE;
     buildProperties.BOARD.value = _BOARD;
     buildProperties.PRODUCT.value = _PRODUCT;
     buildProperties.HARDWARE.value = _HARDWARE;
     buildProperties.FINGERPRINT.value = _FINGERPRINT;
     buildProperties.MANUFACTURER.value = _MANUFACTURER;
     buildProperties.BOOTLOADER.value = _BOOTLOADER;
     buildProperties.BRAND.value = _BRAND;
     buildProperties.HOST.value = _HOST;
     buildProperties.DISPLAY.value = _DISPLAY_ID;
     buildProperties.TAGS.value = _TAGS;
     buildProperties.TYPE.value = _TYPE;
     buildProperties.USER.value = _USER;

     Interceptor.attach(Module.findExportByName("libc.so", "__system_property_get"), {
         onEnter(args) {
             this.args0 = args[0];
             this.args1 = args[1];
         },
         onLeave(retval) {
             if (this.args0) {
                 var args0 = getStr(this.args0);
                 var args1 = getStr(this.args1);

                 if (args0.indexOf('ro.product.brand') != -1) {
                     var args1 = getStr(this.args1);
                     putStr(this.args1, _BRAND);
                 } else if (args0.indexOf('ro.product.cpu.abilist') != -1) {
                     var args1 = getStr(this.args1);
                     if (args1.indexOf('x86') != -1) {
                         putStr(this.args1, _ARCH);
                     }
                 } else if (args0.indexOf('ro.debuggable') != -1) {
                     putStr(this.args1, "0");
                 } else if (args0.indexOf('service.adb.root') != -1) {
                     putStr(this.args1, "0");
                 } else if (args0.indexOf('ro.build.selinux') != -1) {
                     putStr(this.args1, "0");
                 } else if (args0.indexOf('ro.build.display.id') != -1) {
                     putStr(this.args1, _DISPLAY_ID);
                 } else if (args0.indexOf('ro.build.host') != -1) {
                     putStr(this.args1, _HOST);
                 } else if (args0.indexOf('ro.product.model') != -1) {
                     putStr(this.args1, _MODEL);
                 } else if (args0.indexOf('ro.product.board') != -1) {
                     var args1 = getStr(this.args1);
                     putStr(this.args1, _BOARD);
                 } else if (args0.indexOf('ro.product.manufacturer') != -1) {
                     var args1 = getStr(this.args1);
                     putStr(this.args1, _MANUFACTURER);
                 } else if (args0.indexOf('gsm.version.baseband') != -1) {
                     putStr(this.args1, _BASEBAND);
                 } else if (args0.indexOf('ro.build.user') != -1) {
                     putStr(this.args1, _USER);
                 } else if (args0.indexOf('ro.build.tags') != -1) {
                     putStr(this.args1, _TAGS);
                 } else if (args0.indexOf('ro.build.characteristics') != -1) {
                     putStr(this.args1, _CHARACTERISTICS);
                 } else if (args0.indexOf('ro.build.fingerprint') != -1) {
                     putStr(this.args1, _FINGERPRINT);
                 } else if (args0.indexOf('ro.boot.serialno') != -1) {
                     putStr(this.args1, _SERIAL_NO);
                 } else if (args0.indexOf('ro.serialno') != -1) {
                     putStr(this.args1, _SERIAL_NO);
                 } else if (args0.indexOf('ro.boot.qemu') != -1) {
                     putStr(this.args1, "");
                 } else if (args0.indexOf('ro.boot.qemu.gltransport.name') != -1) {
                     putStr(this.args1, "");
                 } else if (args0.indexOf('ro.boot.qemu.gltransport.drawFlushInterval') != -1) {
                     putStr(this.args1, "");
                 } else if (args0.indexOf('ro.boot.qemu.gltransport') != -1) {
                     putStr(this.args1, "");
                 } else if (args0.indexOf("ro.crypto.state") != -1) {
                     putStr(this.args1, "encrypted");
                 } else if (args0.indexOf("ro.bootloader") != -1) {
                     putStr(this.args1, _BOOTLOADER);
                 } else if (args0.indexOf("ro.build.type") != -1) {
                     putStr(this.args1, "user");
                 } else if (args0.indexOf("ro.product.cpu.abilist") != -1) {
                     putStr(this.args1, "arm64-v8a,armeabi-v7a,armeabi");
                 } else if (args0.indexOf("ro.boot.verifiedbootstate") != -1) {
                     putStr(this.args1, "green");
                 } else if (args0.indexOf("ro.boot.flash.locked") != -1) {
                     putStr(this.args1, "1");
                 } else if (args0.indexOf("ro.warranty_bit") != -1) {
                     putStr(this.args1, "");
                 } else if (args0.indexOf("ro.boot.vbmeta.device_state") != -1) {
                     putStr(this.args1, "locked");
                 } else if (args0.indexOf("ro.boot.warranty_bit") != -1) {
                     putStr(this.args1, "0");
                 }
             }
         }
     });

}
     function bypassExits() {

         // Process.killProcess.implementation = function(code) {
         //     console.log('F: Process.killProcess(' + code + ') called - Blocked');
         // }


         System.exit.implementation = function(code) {
             console.error('F: System.exit(' + code + ') called - Blocked');
         };


         Runtime.exit.implementation = function(code) {
             console.error('F: Runtime.exit(' + code + ') called - Blocked');
         };

         Interceptor.attach(Module.findExportByName('libc.so', 'exit'), {
             onEnter: function(args) {
                 var exitCode = args[0].toInt32();
                 console.error('F: Native exit(' + exitCode + ') called - Blocked');
             },
             onLeave: function(retval) {}
         });
     }

     function bypassInstallReferrer() {
         const _INSTALL_REFERRER = "utm_source=google-play&utm_medium=non-organic";
         // "utm_source=google-play&utm_medium=non-organic"
         // "utm_medium=non-organic"; 
         // "utm_source=apps.facebook.com&amp";
         // "utm_medium=non-organic"; 
         // "utm_medium=Non-Organic"
         // "utm_source=fb-campaign&utm_medium=non-organic";

         try {
             const ReferrerDetails = Java.use('com.android.installreferrer.api.ReferrerDetails');
             if (ReferrerDetails) {
                 ReferrerDetails['getInstallReferrer'].implementation = function() {
                     let ret = this.getInstallReferrer();
                     console.warn(`I: getInstallReferrer called | replacing ${ret} -> ${_INSTALL_REFERRER}`);
                     return _INSTALL_REFERRER;
                 };
             }
         } catch (error) {
             // console.log("I: Install Referrer class not found !");
         }
         Java.use("android.os.Bundle").getString.overload("java.lang.String").implementation = function(s) {
             if (s == "install_referrer") {
                 let ret = this.getString(s);
                 console.warn(`I: getString(install_referrer) called | replacing ${ret} -> ${_INSTALL_REFERRER}`);
                 return _INSTALL_REFERRER;
             }
             return this.getString(s);
         }
     }

     function bypassAdbChecks() {
         var overloadCount1 = settingsSecure['getInt'].overloads.length;
         for (var i = 0; i < overloadCount1; i++) {
             settingsSecure['getInt'].overloads[i].implementation = function() {
                 var retval = this['getInt'].apply(this, arguments);
                 var param = arguments[1];
                 if (param === 'development_settings_enabled' || param == 'adb_enabled') {
                     console.error('I: Anti-debug checks detected -> bypassed ');
                     return 0;
                 }
                 return retval;
             };
         }

         var overloadCount2 = settingsGlobal['getInt'].overloads.length;
         for (var i = 0; i < overloadCount2; i++) {
             settingsGlobal['getInt'].overloads[i].implementation = function() {
                 var retval = this['getInt'].apply(this, arguments);
                 var param = arguments[1];
                 if (param === 'development_settings_enabled' || param == 'adb_enabled') {
                     console.error('I: Anti-debug checks detected -> bypassed ');
                     return 0;
                 }
                 return retval;
             };
         }
     }

     function bypassnetworkFunctions() {
         const NET_TYPE = 0;
         // TYPE_MOBILE = 0
         // TYPE_WIFI = 1
         // TYPE_WIFI = 17

         var DATA_ENABLED = true; // set to false if you want WIFI to be detected
         var NETWOTK_CONNECTED = true;

         NetworkInfo.isConnected.implementation = function() {
             var retval = this['isConnected']();
             // console.log(`I: NetworkInfo.isConnected() | replacing ${this.isConnected()} -> ${retval}`);
             return NETWOTK_CONNECTED;
         };

         NetworkInfo.getType.implementation = function() {
             var retval = this['getType']();
             // console.log(`I: NetworkInfo.getType() | replacing ${this.getType()} -> ${retval}`);
             return NET_TYPE;
         };

         TelephonyManager.isDataEnabled.implementation = function() {
             // console.log('Replacing Data enabled check.');
             return DATA_ENABLED;
         };
     }

     function enableScreenshots() {
         var surface_view = Java.use('android.view.SurfaceView');
         var set_secure = surface_view.setSecure.overload('boolean');

         set_secure.implementation = function(flag) {
             set_secure.call(false);
         };
         var window = Java.use('android.view.Window');
         var set_flags = window.setFlags.overload('int', 'int');

         var window_manager = Java.use('android.view.WindowManager');
         var layout_params = Java.use('android.view.WindowManager$LayoutParams');

         set_flags.implementation = function(flags, mask) {
             flags = (flags.value & ~layout_params.FLAG_SECURE.value);
             set_flags.call(this, flags, mask);
         };
     }

     function bypassAntiAnalysisTechniques() {

         bypassnetworkFunctions();
         bypassAdbChecks();

         Java.use('android.os.Debug').isDebuggerConnected.implementation = function() {
             var retval = false;
             console.log(`I: Debug.isDebuggerConnected() | replacing ${this.isDebuggerConnected()} -> ${retval}`);
             // printBacktrace();
             return retval;
         }
     };

     function unlinker() {
         // Interceptor.attach(Module.findExportByName(null, 'fopen'), {
         //     onEnter: function(args) {
         //         if (!((args[0].readCString()).includes('/proc/') || (args[0].readCString()).includes('/sys/') || (args[0].readCString()).includes('/system/'))) {
         //             console.log(`I: [fopen] ---> ${args[0].readCString()}`);
         //         }
         //     },
         //     onLeave: function(retval) {
         //     }
         // });

         Java.use('java.io.File').delete.implementation = function() {
             colourLogs('File.delete', this.getAbsolutePath());
             // console.log(`I: [File.delete] ---> ${this.getAbsolutePath()}`);
             return true;
         }
         var unlinkPointer = Module.findExportByName(null, 'unlink');
         Interceptor.replace(unlinkPointer, new NativeCallback(function(path) {
             colourLogs('unlink', path.readCString());
             // console.log(`I: [unlink] ---> ${path.readCString()}`);
             return 0
         }, 'int', ['pointer']));
     }

     function byPassFridaListener() {

         function inet_ntoa(addr) {
             var bytes = [];
             for (var i = 0; i < 4; i++) {
                 bytes.push(addr & 0xff);
                 addr = addr >> 8;
             }
             return bytes.join('.');
         }

         function ntohs(val) {
             return ((val & 0xFF) << 8) | ((val >> 8) & 0xFF);
         }

         Interceptor.attach(Module.getExportByName("libc.so", "connect"), {
             onEnter(args) {
                 var sockaddr = args[1];

                 // Read the family (first 2 bytes) to determine if it's IPv4 or IPv6
                 var family = Memory.readU16(sockaddr);

                 if (family === 2) { // AF_INET (IPv4)
                     var sin_port = Memory.readU16(sockaddr.add(2));
                     var sin_addr = Memory.readU32(sockaddr.add(4));

                     var ip = inet_ntoa(sin_addr);
                     var port = ntohs(sin_port);

                     this.original = `${ip}:${port}`;
                     console.log

                     if (ip === "127.0.0.1" && port == 27042) {
                         var newport_value = 0x5555;
                         Memory.writeU16(sockaddr.add(2), newport_value);
                         this.newconnect = `${ip}:${ntohs(newport_value)}`;
                         byPassLogs('Bypassing frida port check', this.original, this.newconnect);
                     }
                 }
             },
             onLeave(retval) {
                
             }
         });
     }

     /* ----------- Bypass Functions End -----------------*/

     /* ----------- Logging Functions -----------------*/

     function assetsLogging() {

         AssetManager['open'].overload('java.lang.String').implementation = function(args) {
             console.warn(`I: [getAssets().open] -----> ${args}`);
             // printBacktrace();
             return AssetManager['open'].overload('java.lang.String').call(this, args);
         }

         Resources.openRawResource.overload('int').implementation = function(arg0) {
             console.warn(`I: [openRawResource] -----> ${arg0}`);
             return this.openRawResource(arg0);
         };
     }

     function installFunctionsLogging() {
         var intent = Java.use('android.content.Intent');
         intent['setDataAndType'].implementation = function(uri, str) {
             if (str === 'application/vnd.android.package-archive') {
                 console.warn(`I: Intent with application/vnd.android.package-archive called for ${uri}`);
                 printBacktrace();
             }
             return this['setDataAndType'].call(this, uri, str);
         }
         const PackageInstaller$Session = Java.use("android.content.pm.PackageInstaller$Session");
         PackageInstaller$Session.openWrite.overload('java.lang.String', 'long', 'long').implementation = function(arg0, arg1, arg2) {
             console.warn(`I: PackageInstaller$Session.openWrite invoked, writing to file ${arg0}`);
             printBacktrace();
             return this.openWrite(arg0, arg1, arg2);
         };
     }

     function sendTextMsgLogging() {
         var SmsManager = Java.use('android.telephony.SmsManager');

         SmsManager['sendTextMessage'].overloads[0].implementation = function() {
             console.warn(`I: sendTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
             printBacktrace();
             return SmsManager['sendTextMessage'].apply(this, arguments);
         }

         SmsManager['sendTextMessage'].overloads[1].implementation = function() {
             console.warn(`I: sendTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
             printBacktrace();
             return SmsManager['sendTextMessage'].apply(this, arguments);
         }

         SmsManager['sendTextMessage'].overloads[2].implementation = function() {
             console.warn(`I: sendTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
             printBacktrace();
             return SmsManager['sendTextMessage'].apply(this, arguments);
         }

         SmsManager['sendMultipartTextMessage'].overloads[0].implementation = function() {
             console.warn(`I: sendMultipartTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
             printBacktrace();
             return SmsManager['sendMultipartTextMessage'].apply(this, arguments);
         }

         SmsManager['sendMultipartTextMessage'].overloads[1].implementation = function() {
             console.warn(`I: sendMultipartTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
             printBacktrace();
             return SmsManager['sendMultipartTextMessage'].apply(this, arguments);
         }

         SmsManager['sendMultipartTextMessage'].overloads[2].implementation = function() {
             console.warn(`I: sendMultipartTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
             printBacktrace();
             return SmsManager['sendMultipartTextMessage'].apply(this, arguments);
         }
     }

     function runTimeExecLogging() {
         const runtime = Java.use('java.lang.Runtime');
         runtime.exec.overloads[0].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
         runtime.exec.overloads[1].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
         runtime.exec.overloads[2].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
         runtime.exec.overloads[3].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
         runtime.exec.overloads[4].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
         runtime.exec.overloads[5].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
         runtime.exec.overloads[5].implementation = function() {
             returnLogs('Runtime.exec()', 'Commands Received', arguments[0])
             return this['exec'].apply(this, arguments);
         }
     }

     function urlLogging() {

         URL['openConnection'].overloads[0].implementation = function() {
             colourLogs('openConnection()', this.toString());
             // console.log(`I: [openConnection()] ---> ${this.toString()}`);
             // printBacktrace();
             return this['openConnection'].apply(this, arguments);;
         }


         androidNetUrl.parse.overload('java.lang.String').implementation = function(url) {
             if (url.includes('firebase')) {
                 colourLogs('Firebase Url', url);
                 // console.log(`I: [Firebase Url] ---> ${url}`);
                 // printBacktrace();
             }
             return this.parse(url);
         };


         WebView.loadUrl.overload("java.lang.String").implementation = function(url) {
             colourLogs('loadUrl()', url.toString());
             // console.log(`I: [loadUrl()] ---> ${s.toString() }`);
             printBacktrace();
             this.loadUrl.overload("java.lang.String").call(this, url);

             WebView.loadUrl.overload('java.lang.String', 'java.util.Map').implementation = function(url, headers) {
                 colourLogs('loadUrl()', url + headers);
                 // printBacktrace();
                 this.loadUrl.overload('java.lang.String', 'java.util.Map').call(this, url, headers)
             };
         }


         Socket["connect"].overload('java.net.SocketAddress', 'int').implementation = function(endpoint, timeout) {
             colourLogs('Socket.connect()', endpoint);
             // console.log(`I: [Socket.connect()] endpoint=${endpoint}, timeout=${timeout}`);
             // printBacktrace();
             this["connect"](endpoint, timeout);
         };
         firebaseLogging();
     }

     function firebaseLogging() {
         try {
             var databaseReference = Java.use('com.google.firebase.database.DatabaseReference');
             databaseReference['setValue'].overload('java.lang.Object').implementation = function(args) {
                 console.log(`I: [DatabaseReference.setValue()] ${args}`);
                 return this['setValue'].call(this, args);
             }
         } catch {}
     }

     function libsLoadedLogging() {
         const dlopen = Module.findExportByName(null, 'dlopen');
         const android_dlopen_ext = Module.findExportByName(null, 'android_dlopen_ext');

         if (dlopen) {
             try {
                 Interceptor.attach(dlopen, {
                     onEnter: function(args) {
                         this.libName = args[0].readCString().split('/').pop();
                     },
                     onLeave: function(args) {
                         colourLogs('dlopen', this.libName)
                         // printBacktrace();
                         // console.log(`I: [dlopen] ${this.libName}`)
                     }
                 })
             } catch {}
         }

         if (android_dlopen_ext) {
             try {
                 Interceptor.attach(android_dlopen_ext, {
                     onEnter: function(args) {
                         this.libName = args[0].readCString().split('/').pop();
                     },
                     onLeave: function(args) {
                         colourLogs('android_dlopen_ext', this.libName)
                         // printBacktrace()
                         // console.log(`I: [android_dlopen_ext] ${this.libName}`)
                     }
                 })
             } catch {}
         }
     }

     function enumerateLibraryLoaded() {
         Process.enumerateModules().forEach(function(module) {
             if (module.path.includes(getPackageName())) {
                 console.log(`I: Loading dynamic library ${module.name}`);
             }
         });
     }

     /* ----------- Logging Functions End -----------------*/

     Java.perform(function() {

         console.log(`\n----- Running Frida Hooks ----- `)

         /*----- Bypass Calls -----*/

         bypassBuildValues();
         bypassExits();
         bypassInstallReferrer();
         bypassAntiAnalysisTechniques();
         enableScreenshots();
         unlinker();
         byPassFridaListener();

         /*----- Logging Calls -----*/

         assetsLogging();
         installFunctionsLogging();
         sendTextMsgLogging();
         runTimeExecLogging();
         urlLogging();
         libsLoadedLogging();

         setTimeout(function() {
             // enumerateLibraryLoaded();
         }, 1000);
     });
