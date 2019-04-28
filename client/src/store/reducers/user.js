// import update from "immutability-helper";
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../actions/user';
import { isEmpty } from 'ramda/src/isEmpty';

export default function user(state = { isAuth: false, user: {} }, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.user,
        isAuth: true
      };

    case LOGOUT_USER:
      return {
        isAuth: false
      };
    case UPDATE_USER: {
      if (isEmpty(action.user)) {
        return { user: action.user, isAuth: false };
      } else {
        return { user: action.user, isAuth: true };
      }
    }
    default:
      return state;
  }
}
