const winston = require("winston");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
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

// Create session
app.use(
  session({
    // Used to compute a hash
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    // Store session on DB
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/test",
    }),
  })
);

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/index")(app);

app.listen(port, () => winston.info(`Listening on port ${port}...`));
