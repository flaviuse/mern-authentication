import { Token, TokenDocument } from "@models/token.model";
import crypto from "crypto";
import { Schema } from "mongoose";

export const createToken = (): TokenDocument =>
  new Token({
    token: crypto.randomBytes(16).toString("hex"),
  });

export const findTokenBy = async (prop: string, value: string) =>
  await Token.findOne({ [prop]: value });

export const setUserId = (token: TokenDocument, userId: typeof Schema.Types.ObjectId): void => {
  token._userId = userId;
};

export const saveToken = (token: TokenDocument) => token.save();

export default {
  createToken,
  findTokenBy,
  setUserId,
  saveToken,
};
