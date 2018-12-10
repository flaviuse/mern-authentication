import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import R from "../../../utils/ramda";
import Joi from "joi-browser";
import Form from "../../common/form.jsx";
import { attemptLogin } from "../../../store/thunks/auth";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    try {
      const { data } = this.state;
      this.props.attemptLogin(data).catch(R.identity);
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
      <div className="ui container col-md-4">
        <h2 class="ui teal image header   ">
          <div class="content ">Log-in to your account</div>
        </h2>
        <form onSubmit={this.handleSubmit} className="ui massive form">
          <div className="ui segment ">
            {this.renderInput("username", "Username", "text", "user icon")}
            {this.renderInput("password", "Password", "password", "lock icon")}
            {this.renderButton("Login")}
          </div>
        </form>
        <div className="ui message">
          <a className="ml-3" href="/login/forgot">
            Forgot your password? Click here.
          </a>
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
