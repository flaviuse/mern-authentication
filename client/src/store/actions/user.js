export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";

export function login(user) {
  return {
    type: LOGIN_USER,
    user
  };
}

export function logout() {
  return {
    type: LOGOUT_USER
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  };
}
