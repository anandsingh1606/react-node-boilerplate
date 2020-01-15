const { SMS_ACCOUNT_SID, SMS_AUTH_TOKEN, SMS_API } = process.env;

let client = {};
if (SMS_API !== "false") {
  client = require("twilio")(SMS_ACCOUNT_SID, SMS_AUTH_TOKEN);
}

export default client;
