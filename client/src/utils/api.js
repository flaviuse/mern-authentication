import { push } from "connected-react-router";
import { logout } from "../store/actions/user";
import { toast } from "react-toastify";

export const dispatchError = dispatch => error => {
  console.log("disp trig", error.response.data);
  if (error.response.status === 401) {
    dispatch(logout());
    dispatch(push("/login"));
  }
  if (error.response) {
    toast.error(`${error.response.data.message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  throw error;
};

export const handleError = error => {
  console.log("handle trig", error.response);
  if (error.response) {
    toast.error(`${error.response.data.message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
    throw error;
  } else {
    const response = {
      status: 500,
      body: { message: "Internal Server error" }
    };
    toast.error(`${response.body.message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
    throw error;
  }
};

export const handleSuccess = response => {
  toast.success(`${response.data.message}`, {
    position: toast.POSITION.TOP_RIGHT
  });
  return response;
};
