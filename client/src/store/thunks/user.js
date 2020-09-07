import { getUser } from "../../api/index";
import { setUser, resetUser } from "./../actions/user";

export const attemptGetUser = () => async (dispatch) =>
  await getUser()
    .then((res) => {
      if(res.data.user) {dispatch(setUser(res.data.user));}
      else {dispatch(resetUser())}
    })
    .catch(() => dispatch(resetUser()));
