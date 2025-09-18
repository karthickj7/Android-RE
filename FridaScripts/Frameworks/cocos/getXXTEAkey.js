function getKey(libname) {
    var cocoslib = Module.findExportByName(libname, "xxtea_decrypt");
    if (cocoslib) {
        Interceptor.attach(cocoslib, {
            onEnter: function(args) {
                console.log('xxtea key -> ' + args[2].readCString());
            },
            onLeave: function(retval) {

            }
        });
    }
}

Java.perform(() => {
    var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
    if (android_dlopen_ext) {
        Interceptor.attach(android_dlopen_ext, {
            onEnter: function(args) {
                var soName = args[0].readCString();
                this.libname = soName;
                // console.log(soName);
            },
            onLeave: function(retval) {
                if (Module.findExportByName(this.libname, "xxtea_decrypt")) {
                    console.log(this.libname);
                    getKey(this.libname)
                }
            }
        });
    }
})
