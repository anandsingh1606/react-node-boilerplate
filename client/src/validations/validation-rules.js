import { ValidatorForm } from "react-form-validator-core";
import validationErrorMessages from "./validation-messages";

// custom validation
ValidatorForm.addValidationRule("isMobile", (value) => {
  const regex = new RegExp(/^[0-9]\d{9}$/);
  return regex.test(value);
});

export const getFormatedRule = (ruleName, msg, ruleValue) => {
  const defaultMessage = validationErrorMessages[ruleName];
  const originalRuleName = ruleValue ? `${ruleName}:${ruleValue}` : ruleName;
  return { name: originalRuleName, msg: { msg, defaultMessage: defaultMessage } };
};


// ANCHOR  You can override any rule name here.
export default {
  required: (msg = { fieldName: "This field" }) => getFormatedRule("required", msg),
  isEmail: (msg) => getFormatedRule("isEmail", msg),
  isNumber: (msg) => getFormatedRule("isNumber", msg),
  isPositive: (msg) => getFormatedRule("isPositive", msg),
  minStringLength: (msg = { fieldName: "This field", min: 6 }, ruleValue = 6) => getFormatedRule("minStringLength", msg, ruleValue),
  matchRegexp: (msg, ruleValue) => getFormatedRule("matchRegexp", msg, ruleValue),
  isMobile: (msg) => getFormatedRule("isMobile", msg),
};
