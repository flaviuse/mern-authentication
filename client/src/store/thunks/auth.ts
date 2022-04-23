import { push } from "connected-react-router";
import { login, logout, User } from "../actions/user";
import { Dispatch } from "redux";
import { Credentials } from "src/store/actions/user";

import {
  postUser,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword,
} from "../../api/index";

export const attemptLogin = (credentials: Credentials) => (dispatch: Dispatch) =>
  postLogin(credentials).then(({ data }) => {
    dispatch(login(data.user));
    dispatch(push("/home"));
  });

export const attemptSendResetPasswordLink = (email: string) => (dispatch: Dispatch) =>
  sendResetPasswordLink(email).then(() => {
    dispatch(push("/login/forgot"));
  });

export const attemptResetPassword = (password: string, token: string) => (dispatch: Dispatch) =>
  resetPassword(password, token)
    .then(() => {
      dispatch(push("/login"));
    })
    .catch(() => {
      dispatch(push(`/login/reset/${token}`));
    });

export const attemptLogout = () => (dispatch: Dispatch) =>
  postLogout()
    .then(() => {
      dispatch(logout());
    })
    .finally(() => {
      dispatch(push("/login"));
    });

export const attemptRegister = (newUser: User) => () => postUser(newUser);

export const attemptGetConfirmation = (token: string) => (dispatch: Dispatch) =>
  getConfirmation(token).then(() => {
    dispatch(push("/login"));
  });

export const attemptResendConfirmation = (email: string) => (dispatch: Dispatch) =>
  resendConfirmation(email).catch(() => {
    dispatch(push("/register"));
  });

export const attemptResetRegister = (email: string) => (dispatch: Dispatch) =>
  resetRegister(email).catch(() => {
    dispatch(push("/register"));
  });
