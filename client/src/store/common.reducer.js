import { updateObj, getCurrentLocale, setLocalStorage } from "Utils/common";
import { ACTIONS } from "Constants";

const initState = {
  apiRequests: {},
  apiErrors: {},
  redirectUrl: null,
  locale: getCurrentLocale(),
};

const commonReducer = (state = initState, action) => {
  const actionSuffix = action.type.split(".")[action.type.split(".").length - 1];

  if (action.actionKey) {
    switch (actionSuffix) {
      case "REQUEST":
        return updateObj(state, {
          apiRequests: {
            [action.actionKey]: { $set: true },
          },
          apiErrors: { $set: {} },
        });
      case "SUCCESS":
        return updateObj(state, {
          apiRequests: {
            [action.actionKey]: { $set: false },
          },
          apiErrors: { $unset: [action.actionKey] },
        });
      case "ERROR":
        return updateObj(state, {
          apiRequests: {
            [action.actionKey]: { $set: false },
          },
          apiErrors: {
            [action.actionKey]: { $set: action.error },
          },
        });
      default:
        return { ...state };
    }
  }

  if (action.type === ACTIONS.REDIRECT) {
    return updateObj(state, { redirectUrl: { $set: action.redirectUrl } });
  }

  if (action.type === ACTIONS.SET_LOCALE) {
    setLocalStorage("USER_LOCALE", action.value);
    return updateObj(state, { locale: { $set: action.value } });
  }

  return { ...state };
};

export default commonReducer;
