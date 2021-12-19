import winston from "winston";
import { Error } from "mongoose";
import { Response, Request, NextFunction } from "express";

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
}
