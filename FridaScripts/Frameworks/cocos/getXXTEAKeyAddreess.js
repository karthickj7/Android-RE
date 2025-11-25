function getKey(libname){
	var baseAddress = Module.findBaseAddress(libname);
	console.log(`${libname.split("/").pop()} address ---> ${baseAddress}`);

	Interceptor.attach(baseAddress.add(0x00802f34), {
		onEnter : function(args){
			console.log('key -> ' + args[2].readCString());
		}, 
		onLeave : function(args){
		}
	});
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
                if (Module.findExportByName(this.libname, "Java_org_cocos2dx_lib_Cocos2dxJavascriptJavaBridge_evalString")) {
                    getKey(this.libname)
                }
            }
        });
    }
});
