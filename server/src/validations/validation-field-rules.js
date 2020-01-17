const { check } = require("express-validator/check");

export default {
  email: [
    { ruleName: "required", msg: { fieldName: "Email" } },
    { ruleName: "isEmail" },
  ],
  password: (filed = "password") => {
    return check(filed).not().isEmpty().withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number");
  },
  mobileNumber: (filed = "mobileNumber") => {
    return check(filed).not().isEmpty().withMessage("Mobile Number is required")
      .isMobilePhone()
      .withMessage("Mobile number is not valid");
  },
  countryCode: (filed = "countryCode") => {
    return check(filed).not().isEmpty().withMessage("Country code is required")
      .isInt()
      .withMessage("Country code is not valid");
  },
  displayName: (filed = "displayName") => {
    return check(filed).not().isEmpty().withMessage("Display Name is required");
  },
  otp: (filed = "otp") => {
    return check(filed).not().isEmpty().withMessage("Otp is required")
      .isInt(6)
      .withMessage("Otp is not valid");
  },
};
