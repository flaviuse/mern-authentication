import { LOGIN_USER, LOGOUT_USER, SET_USER, RESET_USER, UserAction, User } from "../actions/user";

export type UserState = {
  isAuth: boolean;
  user: User | null;
};

const initialState: UserState = {
  isAuth: false,
  user: null,
};

export default function user(state = initialState, action: UserAction<any>): UserState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.payload,
        isAuth: true,
      };
    case LOGOUT_USER:
      return {
        isAuth: false,
        user: null,
      };
    case SET_USER:
      return {
        user: action.payload,
        isAuth: true,
      };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
}
