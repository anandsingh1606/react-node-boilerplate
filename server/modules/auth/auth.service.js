import db from "Db";
import User from "Models/user.model";
import Otp from "Models/otp.model";
import UserNumber from "Models/user-number.model";
import { sendSms } from "Utils/sms.util";
import { generateOtp } from "Utils/common.util";

export const createUser = (data, { res }) => {
  const {
    displayName, mobileNumber, countryCode, otp
  } = data;
  return new Promise((resolve) => {
    UserNumber.get({ mobileNumber, countryCode, verified: true }, { res }).then((result) => {
      if (result) {
        return resolve({
          errorMessage: res.getLocaleText("authMobileAlreadyExistMessage"),
        });
      }

      return db.transaction().then((transaction) => {
        User.add({ displayName, countryCode, mobileNumber }, { res, transaction }).then((userSetResult) => {
          const taskUserNumberSave = UserNumber.add(
            {
              mobileNumber, countryCode, verified: true, userId: userSetResult.id
            },
            { res, transaction }
          );
          const taskOtpUpdate = Otp.set({ status: "verified" }, { sendTo: `${countryCode}${mobileNumber}`, otp }, { res, transaction });
          Promise.all([taskUserNumberSave, taskOtpUpdate])
            .then(() => {
              transaction.commit();
              return resolve({ result: userSetResult });
            })
            .catch((e) => {
              transaction.rollback();
              return resolve({ error: e });
            });
        });
      });
    });
  });
};

export const sendOtp = ({ countryCode, mobileNumber }, { res }) => {
  return new Promise((resolve) => {
    const receiverNumber = `${countryCode}${mobileNumber}`;
    const otp = generateOtp();
    Otp.add({ sendTo: receiverNumber, otp }, { res }).then(() => {
      sendSms({
        number: receiverNumber,
        message: res.getLocaleText("authUserOtpMessage", { otp: otp }),
      }).then(({ error, result }) => {
        if (error) {
          console.log("OTP error:", error);
          return resolve({ error: { ...error, message: res.getLocaleText("authOtpNotSentMessage") } });
        }
        return resolve({ result });
      });
    });
  });
};
