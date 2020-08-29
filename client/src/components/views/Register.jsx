import Joi from "joi-browser";
import React from "react";
import { connect } from "react-redux";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
} from "../../store/thunks/auth";
import { Form } from "../shared";

class RegisterForm extends Form {
  initialState = {
    data: { email: "", password: "", username: "" },
    errors: {},
    submited: false,
    resend: false,
  };

  state = this.initialState;

  schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    username: Joi.string().required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props
      .attemptRegister(data)
      .then(() => this.setState({ submited: true }))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errors = { ...this.state.errors };
          if (error.response.data.message.includes("Email")) {
            errors.email = error.response.data.message;
          } else {
            errors.username = error.response.data.message;
          }

          this.setState({ errors });
        }
      });
  };

  resendEmail = async () => {
    const email = this.state.data.email;
    await this.props.attemptResendConfirmation(email).then(() => this.setState({ resend: true }));
  };

  reset = async () => {
    const email = this.state.data.email;
    await this.props.attemptResetRegister(email).then(() => this.setState(this.initialState));
  };

  render() {
    return (
      <div>
        {!this.state.resend && (
          <React.Fragment>
            {!this.state.submited && (
              <div>
                <div className='container'>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", "text")}
                    {this.renderInput("email", "Email", "text")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Sign Up")}
                  </form>
                </div>
              </div>
            )}
            {this.state.submited && (
              <React.Fragment>
                <div className='container'>
                  <div>
                    <p>A verification email has been sent.</p>
                    <p>
                      Check you mailbox : {this.state.data.email}. <br /> You have 12 hours to
                      activate your account. It can take up to 15 min to receive our email.
                    </p>
                    <button onClick={this.resendEmail}>
                      Did not receive the email? Click here to send again.
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {this.state.resend && (
          <React.Fragment>
            <div className='container'>
              <div>Still not received an email? </div>
              Try to register again. You may have given the wrong email. <br />
              If you want to be able to user the same username :<br />
              <button onClick={this.reset}>Click here to try again.</button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  attemptRegister: (newUser) => dispatch(attemptRegister(newUser)),
  attemptResendConfirmation: (email) => dispatch(attemptResendConfirmation(email)),
  attemptResetRegister: (email) => dispatch(attemptResetRegister(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
