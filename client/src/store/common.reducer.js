import { updateObj, getCurrentLocale, setLocalStorage } from "Utils/common";
import { ACTIONS } from "Constants";

const initState = {
  redirectUrl: null,
  locale: getCurrentLocale(),
};

const commonReducer = (state = initState, action) => {
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
