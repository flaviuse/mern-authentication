import { Router, Request, Response } from "express";
import { IUserInstance } from "../models/user.model";

const router = Router();

// Get user informations
router.get("/", (req: Request, res: Response) => {
  const user = (req.user && (req.user as IUserInstance).hidePassword()) || null;
  res.status(200).send({ message: "User info successfully retreived", user });
});

export default router;
