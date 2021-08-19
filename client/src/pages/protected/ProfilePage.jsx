import React from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { username } = useSelector((state) => state.user.user);

  return (
    <div className='container'>
      <p>
        Hey <b>{username}</b> ! Check the github repository:
      </p>
      <a href='https://github.com/flaviuse/mern-authentification'>
        https://github.com/flaviuse/mern-authentification
      </a>
    </div>
  );
}
