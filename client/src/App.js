import React, { Component } from "react";

import { connect, Provider } from "react-redux";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { attemptGetUser } from "./store/thunks/user";

import {
  ConfirmPage,
  Home,
  Profile,
  NavBar,
  Login,
  LoginForgot,
  LoginResetPassword,
  Logout,
  Register,
} from "./components/views";

import { ProtectedRoute } from "./components/shared";
class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props
      .attemptGetUser()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const { store, history } = this.props;
    return (
      !this.state.loading && (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <React.Fragment>
              <NavBar />
              <Switch>
                <Route path='/home' exact component={Home} />
                <ProtectedRoute path='/my-profile' exact component={Profile} />
                <Route path='/account/confirm/:token' exact component={ConfirmPage} />
                <Route path='/register' exact component={Register} />
                <Route path='/login' exact component={Login} />
                <Route path='/login/forgot' exact component={LoginForgot} />
                <Route path='/login/reset/:token' component={LoginResetPassword} />
                <ProtectedRoute path='/logout' exact component={Logout} />
                <Redirect from='/' exact to='/home' />
                <Redirect to='/home' />
              </Switch>
            </React.Fragment>
          </ConnectedRouter>
        </Provider>
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  attemptGetUser: () => dispatch(attemptGetUser()),
});

const mapStateToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
