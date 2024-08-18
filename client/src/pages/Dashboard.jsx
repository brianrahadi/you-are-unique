import React from "react";
import ScrollableComponent from "../components/ScrollableComponent";

const Dashboard = ({ users, loadingUsers }) => {
  // Get today's date formatted as 'Sat, Aug 17'
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="App text-xl flex flex-col items-center mx-auto">
      <div className="text-center">
        <h2 className=" text-black">{today}</h2> {/* Display today's date */}
        <h1 className="text-black">Today's Visitors</h1>
        <div className="search-box">Search all visitors</div>
        {/* {loading ? (
          <div className="spinner"></div>
        ) : Array.isArray(data) ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li> // Adjust based on data structure
            ))}
          </ul>
        ) : (
          <p>{JSON.stringify(data)}</p> // Display data in case it's an object or non-array
        )} */}
      </div>

      <ScrollableComponent users={users} loadingUsers={loadingUsers}/>
    </div>
  );
};

export default Dashboard;
