import { Router } from "express";
import * as userController from "../controllers/user.controllers";

const router = Router();

router.get("/", userController.getUser);

export default router;
