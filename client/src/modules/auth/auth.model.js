import validationFieldRules from "Validations/validation-field-rules";
import { getFormatedFieldRule } from "Validations/validation.utils";

export const mobileSendOtpValidation = {
  mobileNumber: getFormatedFieldRule(validationFieldRules.mobileNumber),
  displayName: getFormatedFieldRule(validationFieldRules.displayName),
  otp: getFormatedFieldRule(validationFieldRules.otp),
};

export const accountCreateValidation = {};

export const fields = {
  MOBILE_NUMBER: "mobileNumber",
  OTP: "otp",
  DISPLAY_NAME: "displayName",
  COUNTRY_CODE: "countryCode",
};

const fieldControls = {
  [fields.MOBILE_NUMBER]: {
    name: "mobileNumber",
    value: "",
    label: "mobileNumber",
    withRequiredValidator: true,
    ...mobileSendOtpValidation.mobileNumber,
  },
  [fields.DISPLAY_NAME]: {
    label: "displayName",
    name: "displayName",
    value: "",
    withRequiredValidator: true,
    ...mobileSendOtpValidation.displayName,
  },
  [fields.OTP]: {
    name: "otp",
    label: "OTP",
    value: "",
    withRequiredValidator: true,
    ...mobileSendOtpValidation.otp,
  },
  [fields.COUNTRY_CODE]: {
    name: "countryCode",
    value: "IN",
  },
};

export const mobileSignupSendOtp = {
  controls: {
    [fields.MOBILE_NUMBER]: { ...fieldControls[fields.MOBILE_NUMBER] },
    [fields.DISPLAY_NAME]: { ...fieldControls[fields.DISPLAY_NAME] },
    [fields.COUNTRY_CODE]: { ...fieldControls[fields.COUNTRY_CODE] },
  },
  view: {
    title: "signUp",
  },
};

export const mobileVerifyOtp = {
  controls: {
    [fields.OTP]: { ...fieldControls[fields.OTP] },
  },
  view: {
    title: "verifyOtp",
  },
};

export const mobileLoginSendOtp = {
  controls: {
    [fields.MOBILE_NUMBER]: { ...fieldControls[fields.MOBILE_NUMBER] },
    [fields.COUNTRY_CODE]: { ...fieldControls[fields.COUNTRY_CODE] },
  },
  view: {
    title: "signIn",
  },
};
