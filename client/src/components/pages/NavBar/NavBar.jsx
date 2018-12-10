import React from "react";
import { Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

const NavBar = ({ user, isAuth }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Boilerplate
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-link nav-item" to="/home">
            Home
          </NavLink>
          {!isAuth && (
            <React.Fragment>
              <NavLink className="nav-link nav-item" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link nav-item" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {isAuth && (
            <React.Fragment>
              <NavLink className="nav-link nav-item" to="/my-profile">
                {user.username}
              </NavLink>
              <NavLink className="nav-link nav-item" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user,
    isAuth: user.isAuth
  };
}

export default connect(mapStateToProps)(NavBar);
