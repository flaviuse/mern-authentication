import { Dispatch } from "redux";
import { getUser } from "../../api/index";
import { setUser, resetUser } from "../actions/user";

export const attemptGetUser = () => (dispatch: Dispatch) =>
  getUser()
    .then((response) => {
      if (response.data.user) {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });
