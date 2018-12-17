import React, { Component } from "react";
import { connect } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import { attemptGetConfirmation } from "../../../store/thunks/auth";
import styles from "./ConfirmPage.module.css";
class ConfirmPage extends Component {
  onChange = async () => {
    const token = this.props.match.params.token;
    await this.props
      .attemptGetConfirmation(token)
      .catch(error => console.log(error));
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/my-profile" />;
    else {
      return (
        <div id={styles.container}>
          <p id={styles.title}>You're so close ...</p>

          <div class="ui success message" id={styles.messageContainer}>
            <div class="header">
              Click the recaptcha to confirm your inscription. <br />
              <br />
              You will be redirected to the login page .
            </div>
            <br />
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_CAPTCHA_KEY}
              onChange={this.onChange}
            />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ user }) {
  return {
    isAuth: user.isAuth
  };
}

const mapDispatchToProps = dispatch => ({
  attemptGetConfirmation: token => dispatch(attemptGetConfirmation(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPage);
