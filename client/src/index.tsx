import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { store, history } from "./store/store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

registerServiceWorker();
