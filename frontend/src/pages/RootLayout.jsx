import React from "react";
import Topbar from "../shared/layout/Topbar";
import LeftSidebar from "../shared/layout/LeftSidebar";
import RightSidebar from "../shared/layout/RightSidebar";
import Bottombar from "../shared/layout/Bottombar";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />

        <section className="main-container">
          <div className="w-full max-w-4xl">
            <Outlet />
          </div>
        </section>

        <RightSidebar />
      </main>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
