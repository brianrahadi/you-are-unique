import React, { useState } from "react";
import { getFormattedShortDate } from "../utils/date";
import "../App.css"; // Import the CSS file with the spinner styles
import { useNavigate } from "react-router-dom";
import useCheckInUser from "../hooks/check-in-user";

const styles = {
  container: {
    maxWidth: "350px",
    // width: "300px",
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
    cursor: "pointer",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
  },
};


const ScrollableComponent = ({ users, loadingUsers, allUsers, isAllVisitors, refreshUsers }) => {
  const { success, loading, error, checkInUser } = useCheckInUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const todayShortDate = getFormattedShortDate(new Date());

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleCheckInUser = async (e, id) => {
    e.preventDefault();
    await checkInUser(id);
    if (success) {
      setName("");
      refreshUsers();
      setOpen(false);
      navigate("/"); // Navigate to home or another page
    }
  };

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
        {isAllVisitors && (
          <div style={styles.row}>
            <span className="text-gray-600 text-base">Name</span>
            <span className="text-gray-600 text-base">Last visited</span>
          </div>
        )}
        {name === ""
          ? Array.isArray(users) &&
            users.map((user, index) => (
              <div
                key={index}
                style={styles.item}
                onClick={() =>
                  navigate("/profile", {
                    state: {
                      name: user.name,
                      lastVisited: user.lastVisitedDetail,
                      timesVisited: user.timesVisited,
                      // notes: user.notes,
                    },
                  })
                }
              >
                <div style={styles.row}>
                  <span>{user.name}</span>
                  <span>{user.lastVisited}</span>
                </div>
              </div>
            </div>
          ))
          : Array.isArray(filteredUsers) &&
            filteredUsers.map((user, index) => (
              <div
                key={index}
                style={styles.item}
                onClick={() =>
                  navigate("/profile", {
                    state: {
                      name: user.name,
                      lastVisited: user.lastVisitedDetail,
                      timesVisited: user.timesVisited,
                      // notes: user.notes,
                    },
                  })
                }
              >
                <div style={styles.row}>
                  <span>{user.name}</span>
                  {getFormattedShortDate(user.lastVisited) ===
                  todayShortDate ? (
                  <span>{user.lastVisited}</span>
                ) : (
                  <button className="inline-block text-base px-4 bg-green-600 hover:bg-green-500 text-white rounded" onClick={(e) => handleCheckInUser(e, user._id)}>
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
