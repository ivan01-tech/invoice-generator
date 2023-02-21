import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <dir className="app-wrapper">
      <h1>Invoice Generator</h1>
      <Outlet />
    </dir>
  );
}

export default Layout;
