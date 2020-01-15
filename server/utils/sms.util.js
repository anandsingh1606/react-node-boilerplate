import smsClient from "Config/sms.config";

export const sendSms = ({ number, message }) => {
  const { SMS_SENDER_NUMBER, SMS_API } = process.env;
  return new Promise((res) => {
    /*=================================================================================
     TODO Before going to production we need to handle this properly.
    ===================================================================================*/
    if (SMS_API === "false") {
      res({});
    }

    smsClient.messages
      .create({
        body: message,
        to: `+${number}`,
        from: SMS_SENDER_NUMBER,
      })
      .then((result) => {
        console.log("sendSmsResult:", result);
        res({ result });
      })
      .catch((error) => {
        console.log("sendSmsError:", error);
        res({ error });
      });
  });
};
