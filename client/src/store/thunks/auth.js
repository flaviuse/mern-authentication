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
    const {data} = await postLogin(user)
    dispatch(login(data.user));
    dispatch(push("/home"));
};

export const attemptSendResetPasswordLink = (email) => async (dispatch) => {
  try {
    await sendResetPasswordLink(email)
  } catch (error) {
    dispatch(push("/login/forgot"))
  }
};

export const attemptResetPassword = (password, token) => async (dispatch) => {
  try {
    await resetPassword(password, token)
    dispatch(push("/login"));
  } catch (error) {
    dispatch(push(`/login/reset/${token}`))
  }
};

export const attemptLogout = () => async (dispatch) => {
  try {
    await postLogout()
    dispatch(logout());
    dispatch(push("/login"));
  } catch (error) {
    dispatch(push("/login"))
  }
}

export const attemptRegister = (newUser) => async (dispatch) => {
  try {
    await postRegister(newUser)
  } catch (e) {
    dispatch(push("/register"))
  }
};

export const attemptGetConfirmation = (token) => async (dispatch) => {
  await getConfirmation(token)
  dispatch(push("/login"))
}

export const attemptResendConfirmation = (email) => async (dispatch) => {
  try {
    await resendConfirmation(email)
  } catch (e) {
    dispatch(push("/register"))
  }
}

export const attemptResetRegister = (email) => async (dispatch) => {
  try {
    await resetRegister(email)
  } catch (error) {
    dispatch(push("/register"))
  }
};
