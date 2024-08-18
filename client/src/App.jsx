import React from "react";
import ReactDOM from "react-dom";
import { VoiceWidget } from "./components/VoiceWidget";
import "./App.css"; // Import the CSS file with the spinner styles
import getAllUsers from "./hooks/get-all-users";

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
    color: "black",
  },
};

const ScrollableComponent = ({ users }) => {
  const getFormattedDate = (dateStr) => new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        {Array.isArray(users) && users.map((user, index) => (
          <div key={index} style={styles.item}>
            <div style={styles.row}>
              <span>{user.name}</span>
              <span>{getFormattedDate(user.lastVisited)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const { users, loadingUsers } = getAllUsers();

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
        <div className="search-box">Search all visitors
        </div>
        {loadingUsers ? (
          <div className="spinner"></div>
        ) : Array.isArray(users) ? (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li> // Adjust based on data structure
            ))}
          </ul>
        ) : (
          <p>{JSON.stringify(users)}</p> // Display data in case it's an object or non-array
        )}
      </div>
      {!loadingUsers && <ScrollableComponent users={users} />}
      <div className="mt-4">
        <VoiceWidget />
      </div>
    </div >
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
