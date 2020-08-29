import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = ({ user, isAuth }) => {
  return (
    <nav>
      <NavLink className="inactive " activeClassName="active" to="/home">
        Home
      </NavLink>
      {!isAuth && (
        <div>
          <NavLink className="inactive" activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink
            className="inactive "
            activeClassName="active"
            to="/register">
            Register
          </NavLink>
        </div>
      )}
      {isAuth && (
        <div>
          <NavLink
            className="inactive"
            activeClassName=" active"
            to="/my-profile">
            {user.username}
          </NavLink>
          <NavLink className="item" activeClassName="item active" to="/logout">
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user,
    isAuth: user.isAuth
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
