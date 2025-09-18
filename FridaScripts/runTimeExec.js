function runTimeExec() {
    const runtime = Java.use('java.lang.Runtime');
    runtime.exec.overloads[0].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
    runtime.exec.overloads[1].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
    runtime.exec.overloads[2].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
    runtime.exec.overloads[3].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
    runtime.exec.overloads[4].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
    runtime.exec.overloads[5].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
    runtime.exec.overloads[5].implementation = function () {
       console.log(`I: [Runtime.exec()] Commands Received --> ${arguments[0]}`)
        return this['exec'].apply(this, arguments);
    }
}

Java.perform(() => {
    runTimeExec();
});
