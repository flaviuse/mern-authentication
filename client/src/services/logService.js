import Raven from "raven-js";

function init() {
  Raven.config(process.env.REACT_APP_SENTRY, {
    release: "1-0-0",
    environment: "development-test",
    autoBreadcrumbs: {
      console: false
    }
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
