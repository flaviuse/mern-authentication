import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./user";

const buildRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });

export default buildRootReducer;
