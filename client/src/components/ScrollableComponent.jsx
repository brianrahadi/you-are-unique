import React from "react";
import "../App.css"; // Import the CSS file with the spinner styles
import { useNavigate } from "react-router-dom";

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

const ScrollableComponent = ({ users, loadingUsers }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container} className="mb-40">
      <div style={styles.scrollContainer}>
        {Array.isArray(users) && users.map((user, index) => (
          <div
            key={index}
            style={styles.item}
            onClick={() =>
              navigate("/profile", {
                state: {
                  name: user.name,
                  lastVisited: user.lastVisited,
                  notes: user.notes,
                },
              })
            }
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
