import { BrowserRouter } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import RecordButton from "./components/RecordButton";
import Router from "./Router";
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

function App() {
  const { users, loadingUsers, refreshUsers } = getAllUsers();

  return (
    <BrowserRouter>
      <Router users={users} loadingUsers={loadingUsers} />
      <BottomNav />
      <RecordButton refreshUsers={refreshUsers} />
    </BrowserRouter>
  );
}

export default App;
