import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./root.reducer";
import thunk from "redux-thunk";

const logger = createLogger({
  timestamp: true,
  diff: true,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);
export default store;
