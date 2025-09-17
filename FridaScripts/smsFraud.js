function sendTextMsg() {
    var SmsManager = Java.use('android.telephony.SmsManager');
    SmsManager['sendTextMessage'].overloads[0].implementation = function () {
        console.warn(`I: sendTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
        return SmsManager['sendTextMessage'].apply(this, arguments);
    }

    SmsManager['sendTextMessage'].overloads[1].implementation = function () {
        console.warn(`I: sendTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
        return SmsManager['sendTextMessage'].apply(this, arguments);
    }

    SmsManager['sendTextMessage'].overloads[2].implementation = function () {
        console.warn(`I: sendTextMessage() called with destinationAddress : ${arguments[0]} & text : ${arguments[2]}`);
        return SmsManager['sendTextMessage'].apply(this, arguments);
    }
}

Java.performNow(function () {
    console.log(`\n Running SMS Fraud Hooks`)
    sendTextMsg();
});
