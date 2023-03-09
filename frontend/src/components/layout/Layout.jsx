import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-wrapper">
      <h1>Invoice Generator</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
