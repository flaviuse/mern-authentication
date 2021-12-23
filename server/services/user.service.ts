import { User, UserDocument } from "./../models/user.model";

export const getClientUser = (user: UserDocument) => user.hidePassword();

export const setResetPasswordToken = (
  user: UserDocument,
  resetTokenValue: string,
  expiryDate: Date
) => {
  user.passwordResetToken = resetTokenValue;
  user.passwordResetExpires = expiryDate;
};

export const queryUserByEmail = async (email: string) => await User.findOne({ email });
