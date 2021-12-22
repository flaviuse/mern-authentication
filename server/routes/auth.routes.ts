import { UserDocument, User } from "../models/user.model";
import { TokenDocument } from "../models/token.model";

import { validateEmail } from "../validations/user.validation";

import { Token } from "../models/token.model";
import sanitize from "mongo-sanitize";
import express from "express";

import * as authControllers from "../controllers/auth.controllers";
import { Error } from "mongoose";

const router = express.Router();

//  Input : username/password via body
//  HTTP Success : 200, message and user infos.
//  HTTP Errors : 400, 401.
router.post("/login", authControllers.postLogin);

//  Input : email via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
router.post("/login/forgot", authControllers.postLoginForgot);

//  Input : reset token via params, new password via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
router.post("/login/reset/:token", authControllers.postLoginReset);

//  Input : void, identified by session cookie.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 500, 503.
router.post("/logout", authControllers.postLogout);

//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
router.post("/verify", authControllers.postVerify);

router.get("/confirmation/:token", authControllers.getConfirmation);

export default router;
