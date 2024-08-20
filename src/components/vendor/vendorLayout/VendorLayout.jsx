import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "../../admin/Header/Header";
import Sidebar from "../../../components/admin/sidebar/SideBar";
import {FaHome, FaRegListAlt} from "react-icons/fa";
import {HiTicket} from "react-icons/hi2";


const vendorNavItems = [
  {path: "/vendor/", label: "Dashboard"},
  {path: "/vendor/events", label: "Events"},
  {path: "/vendor/booked-tickets", label: "Booked Tickets"},
];

const vendorIconMap = {
  "/vendor/": FaHome,
  "/vendor/events": FaRegListAlt,
  "/vendor/booked-tickets": HiTicket,
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
