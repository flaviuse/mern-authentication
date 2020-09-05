const winston = require("winston");
// To Log on mongoDB database use :
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  // Local file
  // winston.add(winston.transports.File, { filename: "logfile.log" });

  // Log on the MongoDB database
  winston.add(winston.transports.MongoDB, {
    db: process.env.DB,
    level: "info",
  });
};
