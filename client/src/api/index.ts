import { Credentials, User } from "src/store/actions/user";
import http from "../services/httpService";

const postLogin = (credentials: Credentials) =>
  http.post<{ user: User }>("/auth/login", credentials);

const sendResetPasswordLink = (email: string) => http.post("/auth/login/forgot", { email });

const resetPassword = (password: string, token: string) =>
  http.post<void>(`/auth/login/reset/${token}`, { password });

const postLogout = () => http.post<void>("/auth/logout");

const postRegister = (user: User) => http.post<void>("/auth/register", user);

const getConfirmation = (token: string) => http.get<void>(`/auth/confirmation/${token}`);

const resendConfirmation = (email: string) => http.post<void>("/auth/resend", { email });

const resetRegister = (email: string) => http.post<void>("/auth/register/reset", { email });

const getUser = () => http.get<{ user: User }>("/user");

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
