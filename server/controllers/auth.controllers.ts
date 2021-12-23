import { Request, Response, NextFunction } from "express";
import sanitize from "mongo-sanitize";
import passport from "passport";
import {
  validateEmail,
  validateLoginInput,
  validatePassword,
} from "../validations/user.validation";
import crypto from "crypto";
import winston from "winston";
import sgMail from "@sendgrid/mail";
import dayjs from "dayjs";

import Token, { TokenDocument } from "../models/token.model";
import User, { UserDocument } from "../models/user.model";
import * as UserService from "./../services/user.service";
import * as TokenService from "./../services/token.service";
import * as LoggerService from "./../services/logger.service";
import { createResetPasswordEmail, sendEmail } from "./../services/email.service";

const host = process.env.HOST; // FRONTEND Host
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Define email address that will send the emails to your users.
const sendingEmail = process.env.SENDING_EMAIL;

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLoginInput(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ username: string; password: string }>(req.body);

  sanitizedInput.username = req.body.username.toLowerCase();

  passport.authenticate("local", (err: Error, user: UserDocument, info) => {
    if (err) {
      return next(err);
    }
    if (info && info.message === "Missing credentials") {
      return res.status(400).send({ message: "Missing credentials" });
    }
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password." });
    }
    if (!user.isVerified)
      return res.status(401).send({
        message: "Your account has not been verified. Please activate your account.",
      });

    req.login(user, (err: Error) => {
      if (err) {
        res.status(401).send({ message: "Authentication failed", err });
      }
      res.status(200).send({ message: "Login success", user: UserService.getClientUser(user) });
    });
  })(req, res, next);
};

export const postLoginForgot = async (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const sanitizedInput = sanitize<{ email: string }>(req.body);

  try {
    const user = await UserService.queryUserByEmail(sanitizedInput.email);
    if (!user) return res.status(404).send({ message: "No user found with this email address." });

    const resetToken = TokenService.createToken();
    const tokenExpiryDate = dayjs().add(12, "hours").toDate();

    TokenService.setUserId(resetToken, user.id);
    UserService.setResetPasswordToken(user, resetToken.token, tokenExpiryDate);

    await user.save(); // TODO in service
    await resetToken.save(); // TODO in service

    try {
      const email = createResetPasswordEmail(user.email, resetToken.token);
      await sendEmail(email);

      return res
        .status(200)
        .send({ message: `A reset passowrd email has been sent to ${user.email}` });
    } catch (error) {
      LoggerService.log.error(error);

      return res.status(503).send({
        message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
      });
    }
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send({ message: "An unexpected error occurred" });
  }
};

export const postLoginReset = (req: Request, res: Response) => {
  // Validate password Input
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  // Find a matching token
  Token.findOne({ token: req.params.token }, function (err: Error, token: TokenDocument) {
    if (err) {
      return res.status(500).send("An unexpected error occurred");
    }
    if (!token)
      return res.status(404).send({
        message: "This token is not valid. Your token may have expired.",
      });

    // If we found a token, find a matching user
    User.findById(token._userId, function (err: Error, user: UserDocument) {
      if (err) {
        return res.status(500).send("An unexpected error occurred");
      }

      if (!user)
        return res.status(404).send({ message: `We were unable to find a user for this token.` });

      if (user.passwordResetToken !== token.token)
        return res.status(400).send({
          message:
            "User token and your token didn't match. You may have a more recent token in your mail list.",
        });

      // Verify that the user token expires date has not been passed
      if (dayjs().toDate() > user.passwordResetExpires) {
        return res.status(400).send({
          message:
            "You cannot reset your password. The reset token has expired. Please go through the reset form again.",
        });
      }
      // Update user
      user.password = req.body.password;
      user.passwordResetToken = "";
      user.passwordResetExpires = dayjs().toDate();
      //Hash new password
      user.hashPassword().then(() =>
        // Save updated user to the database
        user.save(function (err) {
          if (err) {
            return res.status(500).send({ message: "An unexpected error occurred" });
          }
          // Send mail confirming password change to the user
          const mail = {
            to: user.email,
            from: `${sendingEmail}`,
            subject: "Your password has been changed",
            text: "Some useless text",
            html: `<p>This is a confirmation that the password for your account ${user.email} has just been changed. </p>`,
          };
          sgMail.send(mail).catch((error) => {
            winston.error(error);
            return res.status(503).send({
              message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
            });
          });
          return res.status(200).send({ message: "Password has been successfully changed." });
        })
      );
    });
  });
};

export const postLogout = (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if (err) {
      res.status(500).send({ message: "Logout failed", err });
    }
    req.sessionID = "";
    req.logout();
    res.status(200).send({ message: "Logout success" });
  });
};

export const postVerify = (req: Request, res: Response) => {
  // Check for validation errors
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  req.body = sanitize(req.body);

  User.findOne({ email: req.body.email }, function (err: Error, user: UserDocument) {
    if (err) {
      return res.status(500).send({ message: "An unexpected error occurred" });
    }
    if (!user)
      return res.status(404).send({ message: "We were unable to find a user with that email." });
    if (user.isVerified)
      return res.status(400).send({
        message: "This account has already been verified. Please log in.",
      });

    // Create a verification token, save it, and send email
    var token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    // Save the token
    token.save(function (err) {
      if (err) {
        return res.status(500).send("An unexpected error occurred");
      }
      // Send the mail
      const mail = {
        to: user.email,
        from: `${sendingEmail}`,
        subject: "Email Verification",
        text: "Some uselss text",
        html: `<p>Please verify your account by clicking the link: 
        <a href="http://${host}/account/confirm/${token.token}">http://${host}/account/confirm/${token.token}</a> </p>`,
      };
      sgMail
        .send(mail)
        .then(() => {
          return res.status(200).send({ message: "A verification mail has been sent." });
        })
        .catch((error) => {
          winston.error(error);
          return res.status(503).send({
            message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
          });
        });
    });
  });
};

export const getConfirmation = (req: Request, res: Response) => {
  // Find a matching token
  Token.findOne({ token: req.params.token }, function (err: Error, token: TokenDocument) {
    if (err) {
      return res.status(500).send("An unexpected error occurred");
    }
    if (!token)
      return res.status(404).send({
        message: "We were unable to find a valid token. Your token may have expired.",
      });

    // If we found a token, find a matching user
    User.findById(token._userId, function (err: Error, user: UserDocument) {
      if (err) {
        return res.status(500).send({ message: "An unexpected error occurred" });
      }

      if (!user)
        return res.status(404).send({ message: `We were unable to find a user for this token.` });

      if (user.isVerified)
        return res
          .status(400)
          .send({ message: "This user has already been verified. Please log in." });

      // Verify and save the user
      user.isVerified = true;
      user.expires = undefined;

      user.save(function (err) {
        if (err) {
          return res.status(500).send({ message: "An unexpected error occurred" });
        }
        return res.status(200).send({ message: "The account has been verified. Please log in." });
      });
    });
  });
};
