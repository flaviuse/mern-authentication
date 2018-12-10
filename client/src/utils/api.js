import { push } from "connected-react-router";
import { logout } from "../store/actions/user";
import { toast } from "react-toastify";

export const dispatchError = dispatch => response => {
  console.log("dispatch error trig", response);
  if (response.status === 401) {
    dispatch(logout());
    dispatch(push("/login"));
  }
  if (response) {
    toast.error(`${response.data.message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

export const handleError = error => {
  console.log("handle error trig", error);
  if (error.response) {
    toast.error(`${error.response.data.message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
    throw error.response;
  } else {
    const response = {
      status: 500,
      body: { message: "Internal Server error" }
    };
    toast.error(`${response.body.message}`, {
      position: toast.POSITION.TOP_RIGHT
    });
    throw response;
  }
};

export const handleSuccess = response => {
  console.log("handle success trig", response);
  toast.success(`${response.data.message}`, {
    position: toast.POSITION.TOP_RIGHT
  });
  return response;
};
