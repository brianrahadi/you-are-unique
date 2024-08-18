import React from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const {
    name = "sample",
    lastVisited = "",
    notes = "",
  } = location.state || {};

  return (
    <div className="App text-xl flex flex-col items-center mx-auto">
      <div className="text-center">
        <h1 className="text-black">{name}</h1>

        <div className="grid grid-cols-2">
          <p>Last Visited</p>
          <p>{lastVisited}</p>

          <p>Notes</p>
          <p>{notes}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
