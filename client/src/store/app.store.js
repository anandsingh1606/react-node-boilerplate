import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./root.reducer";
import thunk from "redux-thunk";

const logger = createLogger({
  timestamp: true,
  diff: true,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger)),

);
export default store;
