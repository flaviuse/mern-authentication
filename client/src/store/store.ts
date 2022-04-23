import { createBrowserHistory } from "history";
import { ThunkDispatch } from "redux-thunk";
import { UserAction } from "./actions/user";
import configureStore from "./configureStore";

const history = createBrowserHistory();
const store = configureStore(history);

export type AppState = ReturnType<typeof store.getState>;
export type thunkDispatch = ThunkDispatch<AppState, any, UserAction<any>>;

export { store, history };
