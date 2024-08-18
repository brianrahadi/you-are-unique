import React, { useState } from "react";
import { getFormattedShortDate, getFormattedTime } from "../utils/date";
import "../App.css"; // Import the CSS file with the spinner styles
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    width: "300px",
    height: "400px",
    padding: "10px",
    boxSizing: "border-box",
  },
  scrollContainer: {
    height: "100%",
    overflowY: "auto",
    paddingRight: "10px",
    border: "1px solid #ccc",
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    // cursor: "pointer",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
  },
};

const ScrollableComponent = ({ users, loadingUsers, allUsers }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const todayShortDate = getFormattedShortDate(new Date());

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div style={styles.container} className="mb-40">
      <input
        id="price"
        name="price"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full bg-white rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
        placeholder="Search all users"
      />

      <div style={styles.scrollContainer}>
        {name === ""
          ? Array.isArray(users) &&
            users.map((user, index) => (
              <div key={index} style={styles.item}>
                <div style={styles.row}>
                  <span>{user.name}</span>
                  <span>{user.lastVisited}</span>
                </div>
              </div>
            ))
          : Array.isArray(filteredUsers) &&
            filteredUsers.map((user, index) => (
              <div
                key={index}
                style={styles.item}
                // onClick={() =>
                //   navigate("/profile", {
                //     state: {
                //       name: user.name,
                //       lastVisited: user.lastVisited,
                //       notes: user.notes,
                //     },
                //   })
                // }
              >
                <div style={styles.row}>
                  <span>{user.name}</span>
                  {getFormattedShortDate(user.lastVisited) ===
                  todayShortDate ? (
                    <span>{user.lastVisited}</span>
                  ) : (
                    <button className="inline-block text-base px-4 bg-green-600 text-white rounded">
                      Check-in
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ScrollableComponent;
