import { Request, Response } from "express";
import Token from "../models/token.model";
import User, { UserDocument } from "../models/user.model";
import sanitize from "mongo-sanitize";
import { validateEmail, validateRegisterInput } from "../validations/user.validation";
import winston from "winston";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import * as UserService from "../services/user.service";
import * as LoggerService from "../services/logger.service";

const host = process.env.HOST; // FRONTEND Host
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Define email address that will send the emails to your users.
const sendingEmail = process.env.SENDING_EMAIL;

export const getUser = (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).send({ message: "User info successfully retreived", user });
};

export const postUser = async (req: Request, res: Response) => {
  // Validate Register input
  const { error } = validateRegisterInput(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ username: string; password: string; email: string }>(req.body);

  //Check for existing username
  let user: UserDocument | null;

  try {
    user = await UserService.findUserBy("username", sanitizedInput.username.toLowerCase());

    if (user) {
      return res.status(400).send({ message: "Username already taken. Take an another Username" });
    }

    user = await UserService.findUserBy("email", sanitizedInput.email.toLowerCase());

    if (user) {
      return res.status(400).send({ message: "Email already registered. Take an another email" });
    }

    const newUser = new User(sanitizedInput);
    await UserService.setUserPassword(newUser, newUser.password);
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }

  // Create new user

  // Hash password
  newUser!.hashPassword().then(() => {
    // save user
    newUser.save((err) => {
      if (err) {
        return res.status(500).send({ message: "Creation of user failed, try again." });
      } else {
        // create a token
        const token = new Token({
          _userId: newUser._id,
          token: crypto.randomBytes(16).toString("hex"),
        });

        // and store it for validation 12h expires
        token.save(function (err) {
          if (err) {
            return res.status(500).send("An unexpected error occurred");
          }
          // send verification email
          const message = {
            to: newUser.email,
            from: `${sendingEmail}`,
            subject: "Email Verification",
            text: "Some uselss text",
            html: `<p>Please verify your account by clicking the link: 
            <a href="http://${host}/account/confirm/${token.token}">http://${host}/account/confirm/${token.token}</a> </p>`,
          };
          sgMail
            .send(message)
            .then(() => {
              return res.status(200).send({ message: "A verification mail has been sent." });
            })
            .catch((error) => {
              winston.error(error);
              User.findOneAndDelete(
                { email: newUser.email, isVerified: false },
                function (err: Error) {
                  if (err) {
                    return res
                      .status(500)
                      .send(
                        "Impossible to delete the created user. Contact support or wait 12 hours to retry."
                      );
                  }
                }
              );
              return res.status(503).send({
                message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.`,
              });
            });
        });
      }
    });
  });
};

export const postUserCancel = (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  req.body = sanitize(req.body);

  User.findOneAndDelete(
    { email: req.body.email, isVerified: false },
    function (err: Error, user: UserDocument) {
      if (err) {
        return res.status(500).send("An unexpected error occurred");
      }

      if (!user) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send({ message: "User reset success" });
    }
  );
};
