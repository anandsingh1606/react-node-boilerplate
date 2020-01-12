import { getFormatedRule } from "./validation.utils";
import { ValidatorForm } from 'react-form-validator-core';

// custom validation
ValidatorForm.addValidationRule('isMobile', (value) => {
  const regex = new RegExp(/^[0-9]\d{9}$/);
  return regex.test(value);
});


//ANCHOR  You can override any rule name here.
export default {
  required: (msg = { fieldName: "This field" }) => getFormatedRule("required", msg),
  isEmail: (msg) => getFormatedRule("isEmail", msg),
  isNumber: (msg) => getFormatedRule("isNumber", msg),
  isPositive: (msg) => getFormatedRule("isPositive", msg),
  minStringLength: (msg = { fieldName: "This field", min: 6 }, ruleValue = 6) => getFormatedRule("minStringLength", msg, ruleValue),
  matchRegexp: (msg,ruleValue) => getFormatedRule("matchRegexp", msg, ruleValue),
  isMobile:(msg) => getFormatedRule("isMobile", msg),
};

