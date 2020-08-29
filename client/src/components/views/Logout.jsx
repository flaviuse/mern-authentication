import { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { attemptLogout } from '../../store/thunks/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(attemptLogout());
    this.props.dispatch(push('/home'));
  }

  render() {
    return null;
  }
}

export default connect()(Logout);
