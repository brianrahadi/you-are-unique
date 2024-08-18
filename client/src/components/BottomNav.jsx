import React from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 bg-slate-300 w-full h-12">
      <ul className="h-full">
        <Link
          to="/all"
          className="inline-block w-32 text-center text-black active:bg-slate-50 leading-10"
        >
          All
        </Link>
        <Link
          to="/"
          className="inline-block w-32 text-center text-black active:bg-slate-50 leading-10"
        >
          Today
        </Link>
      </ul>
    </nav>
  );
};

export default BottomNav;
