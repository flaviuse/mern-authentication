import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return <h1>This is home</h1>;
  }
}

export default connect()(Home);
