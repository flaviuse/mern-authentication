import { NextFunction, Request, Response, Handler } from "express";

module.exports = function (handler: Handler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };
};
