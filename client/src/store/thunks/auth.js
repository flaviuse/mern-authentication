import { push } from "connected-react-router";
import { login, logout } from "../actions/user";

import {
  postRegister,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword,
} from "../../api/index";

export const attemptLogin = (user) => async (dispatch) => {
  await postLogin(user)
    .then((res) => {
      dispatch(login(res.data.user));
      dispatch(push("/home"));
      return res.data;
    })
    .catch(dispatch(push("/login")));
};

export const attemptSendResetPasswordLink = (email) => async (dispatch) => {
  await sendResetPasswordLink(email).catch(dispatch(push("/login/forgot")));
};

export const attemptResetPassword = (password, token) => async (dispatch) => {
  await resetPassword(password, token)
    .then(() => {
      dispatch(push("/login"));
    })
    .catch(dispatch(push(`/login/reset/${token}`)));
};

export const attemptLogout = () => async (dispatch) =>
  await postLogout()
    .then(() => {
      dispatch(logout());
      dispatch(push("/login"));
    })
    .catch(dispatch(push("/login")));

export const attemptRegister = (newUser) => async (dispatch) => {
  await postRegister(newUser).catch(dispatch(push("/register")));
};

export const attemptGetConfirmation = (token) => async (dispatch) =>
  await getConfirmation(token)
    .then(() => {
      dispatch(push("/login"));
    })
    .catch(dispatch(push("/register")));

export const attemptResendConfirmation = (email) => async (dispatch) =>
  await resendConfirmation(email).catch(dispatch(push("/register")));

export const attemptResetRegister = (email) => async () => {
  await resetRegister(email);
};
