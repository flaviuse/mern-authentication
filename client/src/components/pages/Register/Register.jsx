import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Form from "../../common/form";
import R from "../../../utils/ramda";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister
} from "../../../store/thunks/auth";

class RegisterForm extends Form {
  initialState = {
    data: { email: "", password: "", username: "" },
    errors: {},
    submited: false,
    resend: false
  };

  state = this.initialState;

  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    username: Joi.string().required()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await this.props
        .attemptRegister(data)
        .then(() => this.setState({ submited: true }));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  resendEmail = () => {
    try {
      const email = this.state.data.email;
      this.props
        .attemptResendConfirmation(email)
        .then(() => this.setState({ resend: true }));
    } catch (err) {
      console.log(err);
    }
  };

  reset = () => {
    try {
      const email = this.state.data.email;
      this.props
        .attemptResetRegister(email)
        .then(() => this.setState(this.initialState));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.resend && (
          <React.Fragment>
            {!this.state.submited && (
              <div className="ui container col-md-4">
                <h1 class="ui center aligned header teal">
                  <div class="content ">Register</div>
                </h1>
                <form onSubmit={this.handleSubmit} className="ui massive form">
                  <div className="ui segment ">
                    {this.renderInput(
                      "username",
                      "Username",
                      "text",
                      "user icon"
                    )}
                    {this.renderInput(
                      "email",
                      "Email",
                      "text",
                      "envelope icon"
                    )}
                    {this.renderInput(
                      "password",
                      "Password",
                      "password",
                      "lock icon"
                    )}
                    {this.renderButton("Register")}
                  </div>
                </form>
              </div>
            )}
            {this.state.submited && (
              <React.Fragment>
                <div className="ui container col-md-4">
                  <p>
                    An verification email has been sent to :
                    {this.state.data.email}. You have 12 hours to activate your
                    account. It can take up to 15 min to receive our email.
                  </p>
                  <p>Have not received our email?</p>
                  <button className="btn" onClick={this.resendEmail}>
                    Click here
                  </button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {this.state.resend && (
          <React.Fragment>
            <div className="ui container col-md-4">
              <p>
                Still not received an email? You may have given the wrong email.
                Try to register again, if you want to be able to user the same
                username click here :
                <button className="btn" onClick={this.reset}>
                  Retry register
                </button>
              </p>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = R.pick([]);

const mapDispatchToProps = dispatch => ({
  attemptRegister: newUser => dispatch(attemptRegister(newUser)),
  attemptResendConfirmation: email =>
    dispatch(attemptResendConfirmation(email)),
  attemptResetRegister: email => dispatch(attemptResetRegister(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
