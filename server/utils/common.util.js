import { authenticator } from "otplib";
import jwt from "jsonwebtoken";
import localeObject from "Locales";

/*=================================================================================
 ANCHOR Common frequent used functions
===================================================================================*/

const { OTP_SECRET, JWT_SECRET } = process.env;

export const log = (value, label = "", type = "log") => {
  label = label ? `-${label}` : "";
  console.log("\x1b[33m", `=======================Start${label}========================`);
  if (Array.isArray(value)) {
    value.forEach((item) => {
      console[type](item);
    });
  } else {
    console[type](value);
  }

  console.log("\x1b[33m", `========================End${label}=======================`);
};

export const generateOtp = () => {
  // Setting Custom Options (length, etc) : https://github.com/yeojz/otplib#setting-custom-options
  return authenticator.generate(OTP_SECRET);
};

export const getToken = (data) => {
  const token = jwt.sign(data, JWT_SECRET);
  return token;
};

export const getUserLoginToken = ({ user }) => {
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

export const getLocaleText = (currentLocale) => (key, replace) => {
  if (localeObject[currentLocale] && localeObject[currentLocale][key]) {
    if (replace && typeof replace == "object") {
      let localeText = localeObject[currentLocale][key];
      Object.keys(replace).map((objectKey) => {
        localeText = localeText.replace(`{{${objectKey}}}`, replace[objectKey]);
      });
      return localeText;
    }
    return localeObject[currentLocale][key];
  }
  return key;
};