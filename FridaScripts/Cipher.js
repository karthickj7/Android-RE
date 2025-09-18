Java.perform(function() {

    function printStackTrace() {
        Java.perform(function() {
            var JLog = Java.use('android.util.Log'),
                JException = Java.use('java.lang.Exception');
            console.warn(JLog.getStackTraceString(JException.$new()));
        });
    };


    function byteArrayToString(input) {
        var buffer = Java.array('byte', input);
        var result = "";
        for (var i = 0; i < buffer.length; ++i) {
            if (buffer[i] > 31 && buffer[i] < 127)
                result += (String.fromCharCode(buffer[i]));
            else result += ' ';
        }
        return result;
    }


    function decodefindClass() {
        var stackTrace = Java.use('java.lang.Thread').currentThread().getStackTrace();
        var callingFunctionStack = stackTrace[4];
        var className = callingFunctionStack.getClassName();
        if (className.includes('DBProvider')) {
            return null;
        }
        return className;
    }

    /**
     * ---------Base 64
     */
    
    var base64 = Java.use('android.util.Base64');

    try {
        base64.decode.overloads[0].implementation = function(endString, flags) {
            let result = this.decode(endString, flags);
            var class_name = decodefindClass();
            console.log('--------------------------------------------------------------------------');
            console.log(`base64.decode('${endString}') \nreturns -> ${byteArrayToString(result)}`)
            printStackTrace();
            return result;
        }
    } catch (error) {}
    try {
        base64.encode.overloads[0].implementation = function(endString, flags) {
            let result = this.encode(endString, flags);
            var class_name = decodefindClass();
            console.log('--------------------------------------------------------------------------');
            console.log(`base64.encode('${byteArrayToString(endString)}') \nreturns -> ${byteArrayToString(result)}`)
            printStackTrace();
            return result;
        }
    } catch (error) {}

    try {
        const Base64$Encoder = Java.use("java.util.Base64$Encoder");
        Base64$Encoder.encodeToString.overload('[B').implementation = function(arg0) {
            var retval = this.encodeToString(arg0);
            console.log('--------------------------------------------------------------------------');
            console.log(`Base64.getEncoder().encodeToString('${byteArrayToString(endString)}') \nreturns -> ${byteArrayToString(result)}`)
            return retval;
        };

    } catch (error) {}


    /**
     * --------- CIPHER
     */

    var Cipher = Java.use('javax.crypto.Cipher');

    Cipher['doFinal'].overload('[B').implementation = function(data) {
        let result = this.doFinal(data);
        var class_name = decodefindClass();
        console.log('--------------------------------------------------------------------------');
        console.log(`Cipher.doFinal('${byteArrayToString(data)}') \nreturns -> ${byteArrayToString(result)}`);
        printStackTrace();
        return result
    };

    Java.scheduleOnMainThread(function() {});

});
