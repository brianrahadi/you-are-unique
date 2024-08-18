import React, { useState } from "react";
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

const ScrollableComponent = ({ users, loadingUsers }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const filteredUsers = users.filter((user) =>
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
        {Array.isArray(filteredUsers) &&
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
                <span>{user.lastVisited}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScrollableComponent;
