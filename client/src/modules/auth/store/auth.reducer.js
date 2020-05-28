import { actions, moduleName } from "./auth.constants";
import { updateObj } from "Utils/common";
import { apiReducer } from "Utils/store";


const initState = {
  token: null,
};

const authReducer = (state = initState, action) => {
  const { type, data: actionData } = action;
  const updatedState = apiReducer(state, action, moduleName);
  switch (type) {
    case `${actions.loginMobileSendOtp}Success`:
    case `${actions.signupMobileVerifyOtp}Success`:
      return updateObj(updatedState, { token: { $set: actionData.token } });
    case actions.logout:
      return updateObj(updatedState, { token: { $set: null } });
    default:
      return { ...updatedState };
  }
};

export default authReducer;
