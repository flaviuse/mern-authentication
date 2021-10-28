import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";

import thunk from "redux-thunk";
import buildRootReducer from "./reducers/index";
import { History } from "history";
import { UserState } from "./reducers/user";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

type AppState = { user: UserState };

const initialState: AppState = {
  user: {
    isAuth: false,
  },
};

export default function configureStore(history: History, state: AppState = initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [routerMiddleware(history), thunk];

  if (process.env.NODE_ENV !== "production") {
    const logger = createLogger({ collapsed: true, diff: true });
    middlewares.push(logger);
  }

  return createStore(
    buildRootReducer(history),
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
