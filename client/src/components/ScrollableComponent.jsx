import React from "react";
import "../App.css"; // Import the CSS file with the spinner styles

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

const ScrollableComponent = () => {
  const content = Array.from({ length: 20 }, (_, i) => ({
    name: `Name ${i + 1}`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  }));

  return (
    <div style={styles.container} className="mb-40">
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

export default ScrollableComponent;
