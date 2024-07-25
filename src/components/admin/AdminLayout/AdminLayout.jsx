import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../sidebar/SideBar";

const AdminLayout = ({isSidebarVisible, onToggleSidebar}) => {
  return (
    <div className="flex">
      <Sidebar isVisible={isSidebarVisible} />
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <Header onToggleSidebar={onToggleSidebar} />
        <div className="flex-grow p-6 overflow-y-auto ml-0 md:ml-64 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
