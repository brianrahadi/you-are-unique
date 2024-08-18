import React from "react";
import ScrollableComponent from "../components/ScrollableComponent";

const Dashboard = ({ users, loadingUsers, isAllVisitors }) => {
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
        <h1 className="text-black">{isAllVisitors ? 'All Visitors' : 'Today\'s Visitors'}</h1>
        <div className="search-box">Search all visitors</div>
      </div>

      <ScrollableComponent users={users} loadingUsers={loadingUsers}/>
    </div>
  );
};

export default Dashboard;
