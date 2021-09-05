import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ path, component }) {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Route path={path} exact component={component} /> : <Redirect to='/login' />;
}
