import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { getFormattedShortDate, getFormattedTime } from "./utils/date";

const Router = ({ users, loadingUsers }) => {
  const todayShortDate = getFormattedShortDate(new Date());

  const todayVisitors = Array.isArray(users)
    ? users
        .filter((u) => getFormattedShortDate(u.lastVisited) === todayShortDate)
        .map((u) => {
          return {
            ...u,
            lastVisited: getFormattedTime(u.lastVisited),
            lastVisitedDetail: `${getFormattedShortDate(
              u.lastVisited
            )} at ${getFormattedTime(u.lastVisited)}`,
          };
        })
    : [];

  const allVisitors = Array.isArray(users)
    ? users.map((u) => {
        return {
          ...u,
          lastVisited: getFormattedShortDate(u.lastVisited),
          lastVisitedDetail: `${getFormattedShortDate(
            u.lastVisited
          )} at ${getFormattedTime(u.lastVisited)}`,
        };
      })
    : [];

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            users={todayVisitors}
            loadingUsers={loadingUsers}
            allUsers={allVisitors}
          ></Dashboard>
        }
      ></Route>
      <Route
        path="/all"
        element={
          <Dashboard
            users={allVisitors}
            loadingUsers={loadingUsers}
            isAllVisitors
            allUsers={allVisitors}
          ></Dashboard>
        }
      ></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/*" element={<h1>Page 404</h1>}></Route>
    </Routes>
  );
};

export default Router;
