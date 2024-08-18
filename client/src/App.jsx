import React from "react";
import ReactDOM from "react-dom";
import { VoiceWidget } from "./components/VoiceWidget";
import useFetchData from './hooks/use-fetch-data';
import postData from './hooks/post-data';
import './App.css'; // Import the CSS file with the spinner styles

const ScrollableComponent = () => {
  const content = Array.from({ length: 20 }, (_, i) => ({
    name: `Name ${i + 1}`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
  }));

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        {content.map((item, index) => (
          <div key={index} style={styles.item}>
            <div style={styles.row}>
              <span>{item.name}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    height: "400px",
    border: "1px solid #ccc",
    padding: "10px",
    boxSizing: "border-box",
  },
  scrollContainer: {
    height: "100%",
    overflowY: "auto",
    paddingRight: "10px",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
};

function App() {
  const { data, loading } = useFetchData();
  const { success } = postData("wow123");

  // Get today's date formatted as 'Sat, Aug 17'
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="App text-xl flex flex-col items-center mx-auto">
      <div className="text-center">
        <h2>{today}</h2> {/* Display today's date */}
        <h1>Today's Visitors</h1>
        <div className="search-box">
          Search all visitors
        </div>
        {loading ? (
          <div className="spinner"></div> 
        
        ) : (
          Array.isArray(data) ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item}</li> // Adjust based on data structure
              ))}
            </ul>
          ) : (
            <p>{JSON.stringify(data)}</p> // Display data in case it's an object or non-array
          )
        )}
      </div>
      <ScrollableComponent />
      <div className="mt-4">
        <VoiceWidget />
        <p>Post Data: {success ? 1 : 0}</p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
