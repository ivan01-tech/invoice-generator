import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../Header';

function Layout() {
  return (
    <section className="app-wrapper">
      <Header />
      <Outlet />
    </section>
  );
}

export default Layout;
