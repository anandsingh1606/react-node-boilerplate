const { SMS_ACCOUNT_SID, SMS_AUTH_TOKEN } = process.env;
const client = require("twilio")(SMS_ACCOUNT_SID, SMS_AUTH_TOKEN);

export default client;
