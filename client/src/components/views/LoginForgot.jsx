import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Form from '../common/form.jsx';
import { attemptSendResetPasswordLink } from '../../store/thunks/auth';
class LoginForgot extends Form {
  state = {
    data: { email: '' },
    errors: {},
    submited: false
  };

  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label('Email')
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props
      .attemptSendResetPasswordLink(data.email)
      .then(() => this.setState({ submited: true }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.email = error.response.data.message;
          this.setState({ errors });
        }
      });
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/home" />; // ne peut pas se relog si deja log

    return (
      <React.Fragment>
        {!this.state.submited && (
          <div className="container">
            <p>We will send you a reset link on the following email :</p>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('email', 'Email', 'text')}
              {this.renderButton('SEND RESET LINK')}
            </form>
          </div>
        )}
        {this.state.submited && (
          <div className="container">
            <p>A reset link has been sent.</p>
            <p>
              An reset link has been sent to :{this.state.data.email}. You have
              12 hours to activate your account. It can take up to 15 min to
              receive our email.
            </p>
          </div>
        )}
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
    attemptSendResetPasswordLink: email =>
      dispatch(attemptSendResetPasswordLink(email))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForgot);
