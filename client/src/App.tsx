import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";

import {
  ConfirmPage,
  HomePage,
  ProfilePage,
  LoginPage,
  ResetPasswordRequestPage,
  ResetPasswordPage,
  LogoutPage,
  RegisterPage,
} from "./pages";
import { ProtectedRoute, NavBar } from "./components";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <NavBar />
      <Switch>
        <Route path='/home' exact component={HomePage} />
        <AuthRoute path='/account/confirm/:token' exact component={ConfirmPage} />
        <AuthRoute path='/register' exact component={RegisterPage} />
        <AuthRoute path='/login' exact component={LoginPage} />
        <AuthRoute path='/login/forgot' exact component={ResetPasswordRequestPage} />
        <AuthRoute path='/login/reset/:token' component={ResetPasswordPage} />
        <ProtectedRoute path='/logout' component={LogoutPage} />
        <ProtectedRoute path='/my-profile' component={ProfilePage} />
        <Redirect from='/' exact to='/home' />
        <Redirect to='/home' />
      </Switch>
    </>
  );
}
