import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Form from "../../common/form.jsx";
import { attemptResetPassword } from "../../../store/thunks/auth";

class LoginForgot extends Form {
  state = {
    data: { password: "" },
    errors: {}
  };

  schema = {
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const token = this.props.match.params.token;
      const password = data.password;
      await this.props.attemptResetPassword(password, token);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/home" />; // ne peut pas se relog si deja log
    return (
      <React.Fragment>
        <div className="ui container col-md-4">
          <h1>Type your new password :</h1>
          <form onSubmit={this.handleSubmit} className="ui large form">
            {this.renderInput("password", "Password", "password", "lock icon")}
            {this.renderButton("RESET PASSWORD")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    isAuth: user.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptResetPassword: (password, token) =>
      dispatch(attemptResetPassword(password, token))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForgot);
