function getPackageName() {
    return context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getPackageName();
}

function libsLoaded() {
    const dlopen = Module.findExportByName(null, 'dlopen');
    const android_dlopen_ext = Module.findExportByName(null, 'android_dlopen_ext');

    if (dlopen) {
        try {
            Interceptor.attach(dlopen, {
                onEnter: function (args) {
                    this.libName = args[0].readCString().split('/').pop();
                },
                onLeave: function (args) {
                    console.log(`I: [dlopen] ${this.libName}`)
                }
            })
        } catch { }
    }

    if (android_dlopen_ext) {
        try {
            Interceptor.attach(android_dlopen_ext, {
                onEnter: function (args) {
                    this.libName = args[0].readCString().split('/').pop();
                },
                onLeave: function (args) {
                    console.log(`I: [android_dlopen_ext] ${this.libName}`)
                }
            })
        } catch { }
    }
}

function enumerateLibraryLoaded() {
    Process.enumerateModules().forEach(function (module) {
        if (module.path.includes(getPackageName())) {
            console.log(`I: Loading dynamic library ${module.name}`);
        }
    });
}

Java.perform(() => {
    libsLoaded();
    setTimeout(function () {
        enumerateLibraryLoaded();
    }, 1000);
})
