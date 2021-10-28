import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import userReducer from "./user";

const buildRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });

export default buildRootReducer;
