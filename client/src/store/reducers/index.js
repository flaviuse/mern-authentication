import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history), // Connects react router to redux
    user,
  });

export default createRootReducer;
