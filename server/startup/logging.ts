import winston from "winston";
// To Log on mongoDB database use :
// require("winston-mongodb");
require("express-async-errors");

export function initLogger() {
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // Local file
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(new winston.transports.Console());

  // Log on the MongoDB database
  // winston.add(new winston.transports.MongoDB, {
  //   db: process.env.MONGO_URI,
  //   level: "info",
  // });
}
