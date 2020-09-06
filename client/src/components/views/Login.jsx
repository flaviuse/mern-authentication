import Joi from "joi-browser";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { attemptLogin } from "../../store/thunks/auth";
import Form from "../shared/form.jsx";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().label("Username").required(),
    password: Joi.string().label("Password").required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.attemptLogin(data).catch((error) => {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data.message;
        this.setState({ errors });
      }
    });
  };

  render() {
    if (this.props.isAuth) return <Redirect to='/home' />; // ne peut pas se relog si deja log

    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          <div>
            <Link to='/login/forgot'>Forgot your password?</Link>
          </div>
          {this.renderButton("Login")}
        </form>
        <h4>Or</h4>
        <Link to='/register'>Sign Up</Link>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    isAuth: user.isAuth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: (user) => dispatch(attemptLogin(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
