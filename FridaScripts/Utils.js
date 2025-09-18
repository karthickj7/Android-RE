// Prints methods associated with the class
Java.use('<class name>').class.getDeclaredMethods().forEach(element => {
    console.log(element);
});

// Prints the number of method overloads 
Java.use('<class name>').<method name>.overloads.length;


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
        console.log(JLog.getStackTraceString(JException.$new()));
    });
};

function getPackageName() {
    return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getPackageName();
}
