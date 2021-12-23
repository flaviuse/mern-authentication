import { Token } from "../models/token.model";
import crypto from "crypto";
import { TokenDocument } from "./../models/token.model";
import { Schema } from "mongoose";

export const createToken = (): TokenDocument =>
  new Token({
    token: crypto.randomBytes(16).toString("hex"),
  });

export const setUserId = (token: TokenDocument, userId: typeof Schema.Types.ObjectId): void => {
  token._userId = userId;
};
