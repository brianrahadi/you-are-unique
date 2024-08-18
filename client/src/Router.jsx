import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import All from "./pages/All";
import Profile from "./pages/Profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/all" element={<All></All>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/*" element={<h1>Page 404</h1>}></Route>
    </Routes>
  );
};

export default Router;
