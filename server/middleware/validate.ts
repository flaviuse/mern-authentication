import { NextFunction, Request, Response } from "express";
import { ValidationErrorFunction } from "joi";

module.exports = (validator: ValidationErrorFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};
