function printBacktrace() {
    Java.perform(function() {
        var JLog = Java.use('android.util.Log'),
            JException = Java.use('java.lang.Exception');
        // getting stacktrace by throwing an exception
        console.log(JLog.getStackTraceString(JException.$new()));
    });
};

function urlLogging() {
    var URL = Java.use('java.net.URL');
    URL['openConnection'].overloads[0].implementation = function() {
        console.log(`I: [openConnection()] ---> ${this.toString()}`);
        // printBacktrace();
        return this['openConnection'].apply(this, arguments);;
    }

    var androidNetUrl = Java.use('android.net.Uri');
    androidNetUrl.parse.overload('java.lang.String').implementation = function(url) {
        if (url.includes('firebase')) {
            console.log(`I: [Firebase Url] ---> ${url}`);
            // printBacktrace();
        }
        return this.parse(url);
    };

    var WebView = Java.use("android.webkit.WebView");
    WebView.loadUrl.overload("java.lang.String").implementation = function(s) {
        console.log(`I: [loadUrl()] ---> ${s.toString() }`);
        // printBacktrace();
        this.loadUrl.overload("java.lang.String").call(this, s);
    }

    var Socket = Java.use("java.net.Socket");
    Socket["connect"].overload('java.net.SocketAddress', 'int').implementation = function (endpoint, timeout) {
        console.log(`I: [Socket.connect()] endpoint=${endpoint}, timeout=${timeout}`);
        // printBacktrace();
        this["connect"](endpoint, timeout);
    };
}

Java.perform(() => {
    urlLogging();   
})
