import constants from "./auth.constants";
import { updateObj } from "Utils/common";

const { LOGIN, SIGNUP, LOGOUT } = constants;

const initState = {
  token: null,
};

const authReducer = (state = initState, { type, data: actionData }) => {
  switch (type) {
    case SIGNUP.MOBILE.VERIFY_OTP.SUCCESS:
    case LOGIN.MOBILE.VERIFY_OTP.SUCCESS:
      return updateObj(state, { token: { $set: actionData.data.token } });
    case LOGOUT:
      return updateObj(state, { token: { $set: null } });
    default:
      return { ...state };
  }
};

export default authReducer;
