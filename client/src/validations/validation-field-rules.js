import { getLocaleText } from "Utils/common";
export default {
  email: [{ ruleName: "required", msg: { fieldName: "email" } }, { ruleName: "email" }],
  password: [
    { ruleName: "required", msg: { fieldName: "password" } },
    { ruleName: "minStringLength", msg: { fieldName: "password", min: 6 }, ruleValue: 6 },
  ],
  mobileNumber: [
    { ruleName: "required", msg: { fieldName: "mobileNumber" } },
    { ruleName: "isMobile", msg: { fieldName: "mobileNumber" } },
  ],
  otp: [
    { ruleName: "required", msg: { fieldName: "Otp" } },
    { ruleName: "minStringLength", msg: { fieldName: "Otp", min: 6 }, ruleValue: 6 },
  ],
  displayName: [{ ruleName: "required", msg: { fieldName: "displayName" } }],
};
