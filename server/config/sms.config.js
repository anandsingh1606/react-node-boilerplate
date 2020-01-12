import { SMS_ACCOUNT_SID, SMS_AUTH_TOKEN } from "./keys";
const client = require("twilio")(SMS_ACCOUNT_SID, SMS_AUTH_TOKEN);

export default client;
