import { useState, useEffect } from "react";
import { VoiceWidget } from "./components/VoiceWidget";
import useFetchData from './hooks/use-fetch-data'

function App() {
  const { data, loading } = useFetchData();
  return (
    <div className="App text-xl flex justify-center content-center mx-auto">
      <div className="">
      <h1>Today's Attendees</h1>
      {JSON.stringify(data)}
      <VoiceWidget />
      </div>

    </div>
  );
}

export default App;
