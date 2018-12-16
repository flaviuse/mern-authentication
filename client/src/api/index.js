import http from "../services/httpService";
import { handleSuccess, handleError } from "../utils/api";
// AUTH
export const postLogin = user =>
  http.post("/auth/login", user).then(handleSuccess);

export const sendResetPasswordLink = email =>
  http
    .post("auth/login/forgot", { email })
    .then(handleSuccess)
    .catch(handleError);

export const resetPassword = (password, token) =>
  http
    .post(`auth/login/reset/${token}`, { password })
    .then(handleSuccess)
    .catch(handleError);

export const postLogout = () =>
  http
    .post("/auth/logout")
    .then(handleSuccess)
    .catch(handleError);

export const postRegister = user =>
  http.post("/auth/register", user).then(handleSuccess);

export const getConfirmation = token =>
  http
    .get(`/auth/confirmation/${token}`)
    .then(handleSuccess)
    .catch(handleError);

export const resendConfirmation = email =>
  http
    .post("/auth/resend", { email })
    .then(handleSuccess)
    .catch(handleError);

export const resetRegister = email =>
  http
    .post("/auth/register/reset", { email })
    .then(handleSuccess)
    .catch(handleError);

// User - DO NOT PUT HANDLING SUCCESS - It's always success : gives user or empty object. It's needed to trigger the update user in thunks.
export const getUser = () => http.get("/user").catch(handleError);
