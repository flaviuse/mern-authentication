import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";
import { connect } from "react-redux";

const NavBar = ({ user, isAuth }) => {
  return (
    <div id={styles.navbar}>
      <nav className="ui secondary sticky pointing   teal menu">
        <a
          className="item"
          id={styles.left}
          href="https://github.com/flaviuse/mern-authentification"
        >
          <i className="large github  icon" />
        </a>
        <NavLink className="item " activeClassName="item active" to="/home">
          Home
        </NavLink>
        {!isAuth && (
          <div className="right menu" id={styles.right}>
            <NavLink
              className=" item "
              activeClassName="item active"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="item "
              activeClassName="item active"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        )}
        {isAuth && (
          <div className="right menu" id={styles.right}>
            <NavLink
              className="item"
              activeClassName="item active"
              to="/my-profile"
            >
              {user.username}
            </NavLink>
            <NavLink
              className="item"
              activeClassName="item active"
              to="/logout"
            >
              Logout
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user,
    isAuth: user.isAuth
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
