import React from "react";
import useFetchData from "../hooks/use-fetch-data";
import postData from "../hooks/post-data";
import ScrollableComponent from "../components/ScrollableComponent";

const All = () => {
  const { data, loading } = useFetchData();
  const { success } = postData("wow123");

  return (
    <div className="App text-xl flex flex-col items-center mx-auto">
      <div className="text-center">
        <h1 className="text-black">All Visitors</h1>
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

      <ScrollableComponent />
    </div>
  );
};

export default All;
