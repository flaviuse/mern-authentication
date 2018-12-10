import { getUser } from "../../api/index";
import { updateUser } from "../actions/user";

// import { dispatchError } from "../../utils/api";

export const attemptGetUser = () => dispatch =>
  getUser().then(res => {
    dispatch(updateUser(res.data.user));
    return res.data.user;
  });
