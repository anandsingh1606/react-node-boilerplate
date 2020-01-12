import { ACTIONS } from "Constants";

export const redirect = (redirectUrl) => {
  return {
    type: ACTIONS.REDIRECT,
    redirectUrl,
  };
};


export const setLocale = (value) => {
  return {
    type: ACTIONS.SET_LOCALE,
    value,
  };
};
