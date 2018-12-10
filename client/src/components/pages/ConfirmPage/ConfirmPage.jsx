import React, { Component } from "react";
import { connect } from "react-redux";
import R from "../../../utils/ramda";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import { attemptGetConfirmation } from "../../../store/thunks/auth";

class ConfirmPage extends Component {
  onChange = () => {
    try {
      const token = this.props.match.params.token;
      this.props.dispatch(attemptGetConfirmation(token)).catch(R.identity);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/my-profile" />;
    else {
      return (
        <React.Fragment>
          <div className="ui container col-md-4">
            <p>
              Click the recaptcha to confirm your inscription. You will be
              redirected to the login page :
            </p>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_CAPTCHA_KEY}
              onChange={this.onChange}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps({ user }) {
  return {
    isAuth: user.isAuth
  };
}

export default connect(mapStateToProps)(ConfirmPage);
