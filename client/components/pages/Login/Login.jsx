import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import Joi from "joi-browser";
import Form from "../../common/form/form.jsx";
import { attemptLogin } from "../../../store/thunks/auth";
import styles from "./Login.module.css";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .label("Username")
      .required(),
    password: Joi.string()
      .label("Password")
      .required()
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.attemptLogin(data).catch(error => {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data.message;
        this.setState({ errors });
      }
    });
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/home" />; // ne peut pas se relog si deja log

    return (
      <div id={styles.container}>
        <p id={styles.title}>Log in to your account</p>
        <div id={styles.formContainer}>
          <form onSubmit={this.handleSubmit} className="ui large form">
            {this.renderInput("username", "Username", "text", "user icon")}
            {this.renderInput("password", "Password", "password", "lock icon")}
            <div id={styles.forgotMessage}>
              <Link to="/login/forgot">Forgot your password?</Link>
            </div>
            {this.renderButton("Login", styles.loginBtn)}
          </form>
          <h4 className="ui horizontal divider">Or</h4>
          <button className="ui big button teal" id={styles.subscribe}>
            <i className="signup icon" />
            Sign Up
          </button>
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
    attemptLogin: user => dispatch(attemptLogin(user))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
