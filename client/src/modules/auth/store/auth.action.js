import { actions, moduleName } from "./auth.constants";
import { storeUtils } from "Utils";


const { apiPostDispatch } = storeUtils;

export const loginMobileSendOtp = (params) => {
  const { mobileNumber, countryCode } = params;
  return (dispatch) => {
    return apiPostDispatch(dispatch, {
      url: "/auth/login-send-otp",
      data: { mobileNumber, countryCode },
      actionType: actions.loginMobileSendOtp,
      moduleName,
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
      actionType: actions.loginMobileVerifyOtp,
      moduleName
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
      actionType: actions.signupMobileSendOtp,
      moduleName
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
      actionType: actions.signupMobileVerifyOtp,
      moduleName
    }).then((response) => {
      return response;
    });
  };
};

export const logout = () => {
  return {
    type: actions.logout,
  };
};
