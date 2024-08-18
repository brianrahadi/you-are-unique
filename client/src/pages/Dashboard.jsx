import React from "react";
import ScrollableComponent from "../components/ScrollableComponent";

const Dashboard = ({ users, loadingUsers, isAllVisitors, allUsers }) => {
  // Get today's date formatted as 'Sat, Aug 17'
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="App text-xl flex flex-col items-center mx-auto pt-4">
      <div className="text-center mb-4">
        <h2 className=" text-gray-600 text-2xl">{today}</h2>{" "}
        {/* Display today's date */}
        <h1 className="text-black text-4xl">
          {isAllVisitors ? "All Visitors" : "Today's Visitors"}
        </h1>
      </div>

      <ScrollableComponent
        users={users}
        loadingUsers={loadingUsers}
        allUsers={allUsers}
        isAllVisitors={isAllVisitors}
      />
    </div>
  );
};

export default Dashboard;
