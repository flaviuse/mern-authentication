import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { username } = useSelector((state) => state.user.user);

  return (
    <div className='container'>
      <p>
        Hey <b>{username}</b> ! Check the github repositorie:
      </p>
      <a href='https://github.com/flaviuse/mern-authentification'>
        https://github.com/flaviuse/mern-authentification
      </a>
    </div>
  );
};

export default Profile;
