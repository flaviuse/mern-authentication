import React from 'react';
import { connect } from 'react-redux';

const notFound = ({ user }) => {
  return (
    <div className="container">
      <p>
        Hey <i>{user.username}</i>! Check the github repositorie:
      </p>
      <a href="https://github.com/flaviuse/mern-authentification">
        https://github.com/flaviuse/mern-authentification
      </a>
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user
  };
}

export default connect(mapStateToProps)(notFound);
