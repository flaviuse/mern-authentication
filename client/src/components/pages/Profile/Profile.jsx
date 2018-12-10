import React from "react";
import { connect } from "react-redux";

const notFound = ({ user }) => {
  return <h1>Hello {user.username} </h1>;
};

function mapStateToProps({ user }) {
  return {
    user: user.user
  };
}

export default connect(mapStateToProps)(notFound);
