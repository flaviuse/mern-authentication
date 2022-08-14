import { combineReducers } from "redux";

import userReducer from "./user";

const buildRootReducer = () =>
  combineReducers({
    user: userReducer,
  });

export default buildRootReducer;
