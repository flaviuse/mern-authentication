import { Schema } from "mongoose";
import { User, UserDocument } from "./../models/user.model";
import dayjs from "dayjs";

export const getUser = (user: UserDocument) => user.hidePassword();

export const setResetPasswordToken = (
  user: UserDocument,
  resetTokenValue: string,
  expiryDate: Date
) => {
  user.passwordResetToken = resetTokenValue;
  user.passwordResetExpires = expiryDate;
};

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value });

export const findUserById = async (id: typeof Schema.Types.ObjectId) => await User.findById(id);

export const saveUser = async (user: UserDocument) => await user.save();

export const setUserPassword = async (user: UserDocument, password: string) => {
  user.password = password;
  user.passwordResetToken = "";
  user.passwordResetExpires = dayjs().toDate();
  await user.hashPassword();
};
