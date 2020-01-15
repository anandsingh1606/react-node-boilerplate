const { SMS_ACCOUNT_SID, SMS_AUTH_TOKEN, SMS_API } = process.env;

let client = {};
if (SMS_API !== "false") {
  // eslint-disable-next-line global-require
  client = require("twilio")(SMS_ACCOUNT_SID, SMS_AUTH_TOKEN);
}

const constClient = client;
export default constClient;
