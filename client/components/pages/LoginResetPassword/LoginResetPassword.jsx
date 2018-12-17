import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Form from "../../common/form/form.jsx";
import { attemptResetPassword } from "../../../store/thunks/auth";
import styles from "./LoginResetPassword.module.css";
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
    const { data } = this.state;
    const token = this.props.match.params.token;
    const password = data.password;
    await this.props.attemptResetPassword(password, token).catch(error => {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = error.response.data.message;
        this.setState({ errors });
      }
    });
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/home" />; // ne peut pas se relog si deja log
    return (
      <div id={styles.container}>
        <p id={styles.title}>New password</p>
        <div id={styles.formContainer}>
          <form onSubmit={this.handleSubmit} className="ui large form">
            {this.renderInput("password", "Password", "password", "lock icon")}
            {this.renderButton("RESET PASSWORD")}
          </form>
        </div>
      </div>
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
