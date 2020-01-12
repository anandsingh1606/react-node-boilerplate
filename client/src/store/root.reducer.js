
import { combineReducers } from "redux";
import authReducer from "modules/auth/store/auth.reducer";
import commonReducer from "./common.reducer";

const combinedReducers = combineReducers({
  auth: authReducer,
  common: commonReducer,
});


export default combinedReducers;
