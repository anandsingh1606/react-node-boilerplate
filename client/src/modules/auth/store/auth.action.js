import constants from "./auth.constants";
import { storeUtils } from "Utils";

const { LOGIN, SIGNUP,LOGOUT } = constants;
const { apiPostDispatch } = storeUtils;

export const loginMobileSendOtp = (params) => {
  const { mobileNumber, countryCode } = params;
  return (dispatch) => {
    return apiPostDispatch(dispatch, {
      url: "/auth/login-send-otp",
      data: { mobileNumber, countryCode },
      actionType: LOGIN.MOBILE.SEND_OTP,
    }).then((response) => {
      return response;
    });
  };
};

export const loginMobileVerifyOtp = (params) => {
  const { mobileNumber, countryCode, otp } = params;
  return (dispatch) => {
    return apiPostDispatch(dispatch, {
      url: "/auth/login-verify-otp",
      data: { mobileNumber, countryCode, otp },
      actionType: LOGIN.MOBILE.VERIFY_OTP,
    }).then((response) => {
      return response;
    });
  };
};


export const signupMobileSendOtp = (data) => {
  return (dispatch) => {
    return apiPostDispatch(dispatch, {
      url: "/auth/signup-send-otp",
      data,
      actionType: SIGNUP.MOBILE.SEND_OTP,
    }).then((response) => {
      return response;
    });
  };
};

export const signupMobileVerifyOtp = (data) => {
  return (dispatch) => {
    return apiPostDispatch(dispatch, {
      url: "/auth/signup-verify-otp",
      data,
      actionType: SIGNUP.MOBILE.VERIFY_OTP,
    }).then((response) => {
      return response;
    });
  };
};

export const logout =  () => {
  return {
      type: LOGOUT
  }
};