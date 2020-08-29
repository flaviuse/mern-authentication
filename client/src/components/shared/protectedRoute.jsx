import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuth)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

function mapStateToProps({ user }) {
  return { isAuth: user.isAuth };
}

export default connect(mapStateToProps)(ProtectedRoute);
