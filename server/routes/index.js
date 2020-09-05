const user = require("./user");
const auth = require("./auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use(error);
};
