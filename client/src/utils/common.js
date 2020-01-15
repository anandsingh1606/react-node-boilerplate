import updateHelper from "immutability-helper";
import { getCountryCallingCode } from "react-phone-number-input/input";
import localeObject from "Locales/messages";

export const updateObj = (state, data) => {
  return updateHelper(state, data);
};

export const getApiPayload = (controls) => {
  const payloadData = {};
  Object.keys(controls).forEach((key) => {
    const currentFormItem = controls[key];
    let value = currentFormItem.value && currentFormItem.value.trim ? currentFormItem.value.trim() : currentFormItem.value;
    if (key === "countryCode") {
      value = getCountryCallingCode(value);
    }
    payloadData[currentFormItem.name] = value;
  });
  return payloadData;
};

export const isUserLoggedIn = () => {
  return localStorage.getItem("USER_TOKEN");
};

export const isProduction = () => {
  return process.env.ENV === "production";
};

export const getCurrentLocale = () => {
  return localStorage.getItem("USER_LOCALE") || "en";
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getLocaleText = (key) => {
  const currentLocale = getCurrentLocale();
  if (localeObject[currentLocale] && localeObject[currentLocale][key]) {
    return localeObject[currentLocale][key];
  }
  return key;
};
