import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { VoiceWidget } from "./components/VoiceWidget";
import useFetchData from "./hooks/use-fetch-data";
import postData from "./hooks/post-data";
import BottomNav from "./components/BottomNav";
import RecordButton from "./components/RecordButton";
import Router from "./Router";

function App() {
  const { data, loading } = useFetchData();
  const { success } = postData("wow123");
  return (
    <BrowserRouter>
      <Router></Router>

      <div className="App text-xl flex justify-center content-center mx-auto">
        <div className="">
          <h1>Today's Attendees</h1>
          {!loading && JSON.stringify(data)}
          <VoiceWidget />
          <p>Post Data: {success ? 1 : 0}</p>
        </div>
      </div>

      <BottomNav></BottomNav>
      <RecordButton></RecordButton>
    </BrowserRouter>
  );
}

export default App;
