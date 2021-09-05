const winston = require("winston");
// To Log on mongoDB database use :
// require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // Local file
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));

  // Log on the MongoDB database
  // winston.add(new winston.transports.MongoDB, {
  //   db: process.env.MONGO_URI,
  //   level: "info",
  // });
};
