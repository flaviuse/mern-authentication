import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { attemptLogout } from "../../store/thunks/auth";

export default function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptLogout());
    dispatch(push("/home"));
  }, [dispatch]);

  return <p>Logout in progress</p>;
}
