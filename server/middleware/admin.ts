// Protecting routes for Admin only
import { NextFunction, Request, Response } from "express";

module.exports = function (req: Request, res: Response, next: NextFunction) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
};
