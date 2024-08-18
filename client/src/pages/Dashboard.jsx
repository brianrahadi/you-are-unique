import React, { useState } from "react";
import useFetchData from "../hooks/use-fetch-data";
import postData from "../hooks/post-data";
import ScrollableComponent from "../components/ScrollableComponent";

const Dashboard = () => {
  const { data, loading } = useFetchData();
  const { success } = postData("wow123");

  const [name, setName] = useState("");

  // Get today's date formatted as 'Sat, Aug 17'
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="App text-xl flex flex-col items-center mx-auto">
      <div className="text-center mb-4">
        <h2 className=" text-black">{today}</h2> {/* Display today's date */}
        <h1 className="text-black">Today's Visitors</h1>
        <input
          id="price"
          name="price"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-[80%] mx-auto"
          placeholder="Search all visitors"
        />
        {/* <div className="search-box">Search all visitors</div> */}
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

      <ScrollableComponent />
    </div>
  );
};

export default Dashboard;
