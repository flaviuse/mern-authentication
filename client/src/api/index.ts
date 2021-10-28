import http from "../services/httpService";

const postLogin = (user) => http.post("/auth/login", user);
const sendResetPasswordLink = (email) => http.post("/auth/login/forgot", { email });
const resetPassword = (password, token) => http.post(`/auth/login/reset/${token}`, { password });
const postLogout = () => http.post("/auth/logout");
const postRegister = (user) => http.post("/auth/register", user);
const getConfirmation = (token) => http.get(`/auth/confirmation/${token}`);
const resendConfirmation = (email) => http.post("/auth/resend", { email });
const resetRegister = (email) => http.post("/auth/register/reset", { email });
const getUser = () => http.get("/user");

export {
  postLogin,
  sendResetPasswordLink,
  resetPassword,
  postLogout,
  postRegister,
  getConfirmation,
  resendConfirmation,
  getUser,
  resetRegister,
};
