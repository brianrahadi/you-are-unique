import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { VoiceWidget } from "./components/VoiceWidget";
import useFetchData from "./hooks/use-fetch-data";
import postData from "./hooks/post-data";
import BottomNav from "./components/BottomNav";
import RecordButton from "./components/RecordButton";
import Router from "./Router";
import "./App.css"; // Import the CSS file with the spinner styles

import ScrollableComponent from "./components/ScrollableComponent";

function App() {
  const { data, loading } = useFetchData();
  const { success } = postData("wow123");

  // Get today's date formatted as 'Sat, Aug 17'
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <BrowserRouter>
      <Router></Router>

      {/* <div className="App text-xl flex flex-col items-center mx-auto">
        <div className="text-center">
          <h2 className=" text-black">{today}</h2> Display today's date
          <h1 className="text-black">Today's Visitors</h1>
          <div className="search-box">Search all visitors</div>
          {loading ? (
            <div className="spinner"></div>
          ) : Array.isArray(data) ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item}</li> // Adjust based on data structure
              ))}
            </ul>
          ) : (
            <p>{JSON.stringify(data)}</p> // Display data in case it's an object or non-array
          )}
        </div>
        <ScrollableComponent /> */}

      {/* <div className="mt-4">
        <VoiceWidget />
        <p>Post Data: {success ? 1 : 0}</p>
      </div> */}
      {/* </div> */}

      <BottomNav></BottomNav>
      <RecordButton></RecordButton>
    </BrowserRouter>
  );
}

export default App;
