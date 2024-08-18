import React from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 bg-slate-300 w-full h-12">
      <ul className="">
        <Link to="/all">All</Link>
        <Link to="/dashboard">Today</Link>
      </ul>
    </nav>
  );
};

export default BottomNav;
