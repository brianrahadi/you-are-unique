import React from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const {
    name = "",
    lastVisited = "",
    timesVisited = 1,
    notes = [],
  } = location.state || {};

  return (
    <div className="App text-xl flex flex-col items-center mx-auto pt-4">
      <div className="text-center">
        {timesVisited > 2 ? (
          <span className="bg-gray-600 text-white px-4 py-1 rounded">
            Regular
          </span>
        ) : (
          <span className="bg-green-600 text-white px-4 py-1 rounded">New</span>
        )}

        <h1 className="text-black text-4xl font-semibold">{name}</h1>

        <div className="grid grid-cols-3 pt-4">
          <p className="text-gray-500">Last Visited</p>
          <p className="text-gray-500 col-span-2">{lastVisited}</p>
        </div>

        <div className="grid grid-cols-3 pt-4">
          <p className="text-gray-500">Times Visited</p>
          <p className="text-gray-500 col-span-2">{timesVisited}</p>
        </div>

        <div className="grid text-center pt-4">
          <p className="text-gray-500">Notes</p>
        </div>
        <ul className="text-gray-500 col-span-2">
          {[
            "Loves cookie so much",
            "Has 2 lovely kids",
            "Usually jogs in the morning",
            "Hates pancake with syrup",
            "Born and Raised in small town in Russia",
            "Almost got into an accident with a bear"
          ].filter(() => Math.random() > 0.6)
            .map(text => <li className="text-left text-gray-500 list-disc">{text}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
