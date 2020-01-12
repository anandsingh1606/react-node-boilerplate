//NOTE data sanitize, data validation, access control(permission), happy and failure case, error handling, response structure

import { createUser, sendOtp } from "./auth.service";
import User from "Models/user.model";
import UserNumber from "Models/user-number.model";
import Otp from "Models/otp.model";
import { apiResponseHandler } from "Utils/response-handler.util";
import { getUserLoginToken } from "Utils/common.util";

export const signupSendOtpController = (req, res) => {
  const { mobileNumber, countryCode } = req.body;
  const arhObj = apiResponseHandler(res);
  // Check if user exit with given mobile number
  UserNumber.get({ mobileNumber, countryCode: countryCode, verified: true }, { res }).then((result) => {
    if (result) {
      return arhObj.error({ errorMessage: res.getLocaleText("authMobileAlreadyExistMessage") });
    }

    sendOtp({ mobileNumber, countryCode }, { res }).then(({ error: sendOtpError }) => {
      if (sendOtpError) {
        return arhObj.error({ errorMessage: sendOtpError.message });
      }
      return arhObj.success();
    });
  });
};

export const signupVerifyOtpController = (req, res) => {
  const { mobileNumber, displayName, countryCode, otp } = req.body;
  const arhObj = apiResponseHandler(res);
  // check otp
  Otp.get({ sendTo: `${countryCode}${mobileNumber}`, otp, status: "created" }, { res }).then((findOtpResult) => {
    if (!findOtpResult) {
      return arhObj.error({ errorMessage: res.getLocaleText("authOtpInvalidMessage") });
    }

    //create user
    createUser({ mobileNumber, displayName, countryCode, otp }, { res }).then(({ error: createUserError, result: createUserResult }) => {
      if (createUserError) {
        return arhObj.error(createUserError);
      }
      const responsePayload = {
        token: getUserLoginToken({ user: createUserResult }),
        displayName: createUserResult.displayName,
      };
      return arhObj.success(responsePayload);
    });
  });
};

export const loginSendOtpController = (req, res) => {
  const { mobileNumber, countryCode } = req.body;
  const arhObj = apiResponseHandler(res);
  // Check if user exit with given mobile number
  UserNumber.get({ mobileNumber, countryCode: countryCode, verified: true }, { res }).then((result) => {
    if (!result) {
      return arhObj.error({ errorMessage: res.getLocaleText("authUserNotExistMessage") });
    }

    sendOtp({ mobileNumber, countryCode }, { res }).then(({ error: sendOtpError }) => {
      if (sendOtpError) {
        return arhObj.error({ errorMessage: sendOtpError.message });
      }
      return arhObj.success();
    });
  });
};

export const loginWithOtpController = (req, res) => {
  const { mobileNumber, countryCode, otp } = req.body;
  const arhObj = apiResponseHandler(res);
  // check otp
  Otp.get({ sendTo: `${countryCode}${mobileNumber}`, otp, status: "created" }, { res }).then((findOtpResult) => {
    if (!findOtpResult) {
      return arhObj.error({ errorMessage: res.getLocaleText("authOtpInvalidMessage") });
    }
    UserNumber.get(
      { mobileNumber, countryCode, verified: true },
      { res, include: [{ model: User, required: true, where: { active: true } }] }
    ).then((userNumberResult) => {
      if (!userNumberResult) {
        return arhObj.error({ errorMessage: res.getLocaleText("authUserNotActiveMessage") });
      }
      Otp.set({ status: "verified" }, { sendTo: `${countryCode}${mobileNumber}`, otp }, { res }).then(() => {
        const userResult = userNumberResult.User;
        const responsePayload = {
          token: getUserLoginToken({ user: userNumberResult.User }),
          displayName: userResult.displayName,
        };
        return arhObj.success(responsePayload);
      });
    });
  });
};
