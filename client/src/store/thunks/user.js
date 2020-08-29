import { getUser } from "../../api/index";
import { setUser, resetUser } from "./../actions/user";

export const attemptGetUser = () => async (dispatch) =>
  await getUser()
    .then((res) => {
      dispatch(setUser(res.data.user));
    })
    .catch(() => dispatch(resetUser()));
