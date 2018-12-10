const winston = require("winston");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
var MongoStore = require("connect-mongo")(session);
const config = require("config");
const bodyParser = require("body-parser");
const express = require("express");

const port = process.env.PORT || 3900;
const app = express();

require("./startup/passport/passport-setup")();

require("./startup/logging")();
require("./startup/validation")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/prod")(app);

app.set("trust proxy", 1); // trust first proxy

// Create session
app.use(
  session({
    secret: process.env.SESSION_KEY || config.get("session-key"),
    resave: false,
    saveUninitialized: true,
    // Store session on DB
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/index")(app);

app.listen(port, () => winston.info(`Listening on port ${port}...`));
