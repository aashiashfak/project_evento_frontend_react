import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "../../admin/Header/Header";
import Sidebar from "../../../components/admin/sidebar/SideBar";
import {FaHome, FaRegListAlt, FaUsers} from "react-icons/fa";


const vendorNavItems = [
  {path: "/vendor/", label: "Dashboard"},
  {path: "/vendor/events", label: "Events"},
  {path: "/vendor/booked-users", label: "Booked Users"},
];

const vendorIconMap = {
  "/vendor/": FaHome,
  "/vendor/events": FaRegListAlt,
  "/vendor/booked-users":FaUsers
};

const VendorLayout = ({isSidebarVisible, onToggleSidebar}) => {
  return (
    <div className="flex">
      <Sidebar
        isVisible={isSidebarVisible}
        navItems={vendorNavItems}
        iconMap={vendorIconMap}
      />
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <Header onToggleSidebar={onToggleSidebar} />
        <div className="flex-grow overflow-y-auto ml-0 md:ml-64 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
