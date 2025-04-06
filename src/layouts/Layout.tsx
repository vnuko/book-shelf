import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import { useState } from "react";

function Layout() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  function toggleSidebar() {
    setIsSidebarActive((prev) => !prev);
  }

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isActive={isSidebarActive} />
      <Player />
      <main className="main">
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
