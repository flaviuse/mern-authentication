import Joi from 'joi-browser';
import React from 'react';
import { connect } from 'react-redux';
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister
} from '../../../store/thunks/auth';
import R from '../../../utils/ramda';
import Form from '../../common/form/form';
import styles from './Register.module.css';
class RegisterForm extends Form {
  initialState = {
    data: { email: '', password: '', username: '' },
    errors: {},
    submited: false,
    resend: false
  };

  state = this.initialState;

  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label('Email'),
    password: Joi.string()
      .min(5)
      .required()
      .label('Password'),
    username: Joi.string().required()
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props
      .attemptRegister(data)
      .then(() => this.setState({ submited: true }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          const errors = { ...this.state.errors };
          if (error.response.data.message.includes('Email')) {
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
    await this.props
      .attemptResendConfirmation(email)
      .then(() => this.setState({ resend: true }));
  };

  reset = async () => {
    const email = this.state.data.email;
    await this.props
      .attemptResetRegister(email)
      .then(() => this.setState(this.initialState));
  };

  render() {
    return (
      <div id={styles.container}>
        {!this.state.resend && (
          <React.Fragment>
            {!this.state.submited && (
              <div>
                <div id={styles.formContainer}>
                  <form onSubmit={this.handleSubmit} className="ui large form">
                    {this.renderInput(
                      'username',
                      'Username',
                      'text',
                      'user icon'
                    )}
                    {this.renderInput(
                      'email',
                      'Email',
                      'text',
                      'envelope icon'
                    )}
                    {this.renderInput(
                      'password',
                      'Password',
                      'password',
                      'lock icon'
                    )}
                    {this.renderButton(
                      'Sign Up',
                      styles.signupBtn,
                      'signup icon'
                    )}
                  </form>
                </div>
              </div>
            )}
            {this.state.submited && (
              <React.Fragment>
                <div
                  className="ui icon positive message"
                  id={styles.messageContainer}>
                  <i className="inbox icon" />
                  <div className="content">
                    <div className="header">
                      A verification email has been sent.
                    </div>
                    <p>
                      Check you mailbox : {this.state.data.email}. <br /> You
                      have 12 hours to activate your account. It can take up to
                      15 min to receive our email.
                    </p>
                    <button
                      onClick={this.resendEmail}
                      className="ui basic button">
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
            <div
              className="ui icon warning message"
              id={styles.messageContainer}>
              <i className="inbox icon" />
              <div className="content">
                <div class="header">Still not received an email? </div>
                Try to register again. You may have given the wrong email.{' '}
                <br />
                If you want to be able to user the same username :<br />
                <button className="ui small basic button" onClick={this.reset}>
                  Click here to try again.
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
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
