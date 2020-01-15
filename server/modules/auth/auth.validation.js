import validationFieldRules from "Validations/validation-field-rules";

export const signupSendOtpValidation = [
  validationFieldRules.mobileNumber(),
  validationFieldRules.countryCode(),
];

export const signupWithOtpValidation = [
  validationFieldRules.displayName(),
  validationFieldRules.mobileNumber(),
  validationFieldRules.countryCode(),
  validationFieldRules.otp(),
];


export const loginSendOtpValidation = [
  validationFieldRules.mobileNumber(),
  validationFieldRules.countryCode(),
];

export const loginWithOtpValidation = [
  validationFieldRules.mobileNumber(),
  validationFieldRules.countryCode(),
  validationFieldRules.otp(),
];
