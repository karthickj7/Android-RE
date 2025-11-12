Java.perform(() => { 
    Java.use('java.io.File').delete.implementation = function () {
        console.log(`I: delete called for ---> ${this.getAbsolutePath()}`);
        return true;
    }
    var unlinkPointer = Module.findExportByName(null, 'unlink');
    Interceptor.replace(unlinkPointer, new NativeCallback(function (path) {
        console.log(`I: Unlink called for ---> ${path.readCString()}`);
        return 0
    }, 'int', ['pointer']));   
}) 
 
