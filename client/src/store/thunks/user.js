import { getUser } from "../../api/index";
import { setUser, resetUser } from "./../actions/user";

export const attemptGetUser = () => (dispatch) =>
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
