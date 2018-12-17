import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.css";
class Home extends Component {
  render() {
    return (
      <div id={styles.container}>
        <div className="ui icon message" id={styles.messageContainer}>
          <i className="github icon" />
          <div className="content">
            <div className="header">Check the github repositorie:</div>
            <a href="https://github.com/flaviuse/mern-authentification">
              https://github.com/flaviuse/mern-authentification
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
