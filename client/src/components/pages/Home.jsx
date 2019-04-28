import React, { Component } from 'react';
import { connect } from 'react-redux';
class Home extends Component {
  render() {
    return (
      <div className="container">
        <p>Check the github repo :</p>
        <a href="https://github.com/flaviuse/mern-authentification">
          https://github.com/flaviuse/mern-authentification
        </a>
      </div>
    );
  }
}

export default connect()(Home);
