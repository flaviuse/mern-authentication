import React from "react";
import { connect } from "react-redux";
import styles from "./Profile.module.css";

const notFound = ({ user }) => {
  return (
    <div id={styles.container}>
      <div className="ui icon  message" id={styles.messageContainer}>
        <i className="github icon" />
        <div className="content">
          <div className="header">
            Hey <i>{user.username}</i>! Check the github repositorie:
          </div>
          <a href="https://github.com/flaviuse/mern-authentification">
            https://github.com/flaviuse/mern-authentification
          </a>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user
  };
}

export default connect(mapStateToProps)(notFound);
