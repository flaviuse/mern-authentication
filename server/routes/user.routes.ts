import { Router } from "express";
import * as userController from "../controllers/user.controllers";

const router = Router();

router.get("/", userController.getUser);

//  Input : username, email, password via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/register", userController.postUser);

// Delete user with the email if is unverified
//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500.
router.post("/register/cancel", userController.postUserCancel);

export default router;
