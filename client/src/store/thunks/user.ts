import { Dispatch } from "redux";
import { getUser } from "../../api/index";
import { setUser, resetUser, UserAction } from "../actions/user";

export const attemptGetUser = () => (dispatch: Dispatch<UserAction>) =>
  getUser()
    .then((data) => {
      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });
