import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { attemptGetConfirmation } from '../../store/thunks/auth';
class ConfirmPage extends Component {
  onClick = async () => {
    const token = this.props.match.params.token;
    await this.props
      .attemptGetConfirmation(token)
      .catch(error => console.log(error));
  };

  render() {
    if (this.props.isAuth) return <Redirect to="/my-profile" />;
    else {
      return (
        <div className="container">
          <p>Click here to confirm your email</p>
          <button onClick={this.onClick}>Confirmation</button>
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
