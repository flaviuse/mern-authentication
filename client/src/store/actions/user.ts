export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export type User = {
  username: string;
  email: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type UserAction<T> = {
  type: string;
  user?: T;
};

export function login(credentials: Credentials): UserAction<Credentials> {
  return {
    type: LOGIN_USER,
    credentials,
  };
}

export function logout(): UserAction {
  return {
    type: LOGOUT_USER,
  };
}

export function setUser(user: string): UserAction {
  return {
    type: SET_USER,
    user,
  };
}

export function resetUser(): UserAction {
  return { type: RESET_USER };
}
