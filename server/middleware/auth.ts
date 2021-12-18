import { NextFunction, Request, Response } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("Not allowed");
  }
};
