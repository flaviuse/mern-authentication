import { Router } from "express";
import UserController from "@controllers/user.controllers";

const router = Router();

router.get("/", UserController.getUser);

//  Input : username, email, password via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/register", UserController.postUser);

// Delete user with the email if is unverified
//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500.
router.post("/register/cancel", UserController.postUserCancel);

export default router;
