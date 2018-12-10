import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Form from "../../common/form.jsx";
import { attemptSendResetPasswordLink } from "../../../store/thunks/auth";

class LoginForgot extends Form {
  state = {
    data: { email: "" },
    errors: {},
    submited: false
  };

  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Email")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await this.props
        .attemptSendResetPasswordLink(data.email)
        .then(() => this.setState({ submited: true }));
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
        {!this.state.submited && (
          <React.Fragment>
            <div className="ui container col-md-4">
              <h2 class="ui teal image header   ">
                <div class="content ">Reset password request</div>
              </h2>
              <p>We will send you a reset link on the following email :</p>
              <form onSubmit={this.handleSubmit} className="ui large form">
                {this.renderInput("email", "Email", "text", "envelope icon")}
                {this.renderButton("SEND RESET LINK")}
              </form>
            </div>
          </React.Fragment>
        )}
        {this.state.submited && (
          <React.Fragment>
            <div className="ui container col-md-4">
              <p>
                An reset link has been sent to :{this.state.data.email}. You
                have 12 hours to activate your account. It can take up to 15 min
                to receive our email.
              </p>
            </div>
          </React.Fragment>
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
