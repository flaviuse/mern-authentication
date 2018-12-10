import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import "./utils/polyfill";

import logger from "./services/logService";
import App from "./App";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "semantic-ui-css/semantic.min.css";

logger.init();

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);
registerServiceWorker();
