import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { attemptLogout } from "../../store/thunks/auth";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptLogout());
    dispatch(push("/home"));
    // eslint-disable-next-line
  }, []);

  return <p>Logout in progress</p>;
}
