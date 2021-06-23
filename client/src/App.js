import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";

import {
  ConfirmPage,
  Home,
  Profile,
  NavBar,
  Login,
  LoginForgot,
  LoginResetPassword,
  Logout,
  Register,
} from "./components/views";
import ProtectedRoute from "./components/shared/protectedRoute.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path='/home' exact component={Home} />
        <ProtectedRoute path='/my-profile' exact component={Profile} />
        <Route path='/account/confirm/:token' exact component={ConfirmPage} />
        <Route path='/register' exact component={Register} />
        <Route path='/login' exact component={Login} />
        <Route path='/login/forgot' exact component={LoginForgot} />
        <Route path='/login/reset/:token' component={LoginResetPassword} />
        <ProtectedRoute path='/logout' exact component={Logout} />
        <Redirect from='/' exact to='/home' />
        <Redirect to='/home' />
      </Switch>
    </React.Fragment>
  );
}
