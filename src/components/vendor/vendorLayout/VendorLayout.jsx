import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "../../admin/Header/Header";
import Sidebar from "../../../components/admin/sidebar/SideBar";
import {FaHome, FaRegListAlt} from "react-icons/fa";

const vendorNavItems = [
  {path: "/vendor/", label: "Dashboard"},
  {path: "/vendor/products", label: "Products"},
  {path: "/vendor/orders", label: "Orders"},
];

const vendorIconMap = {
  "/vendor/": FaHome,
  "/vendor/products": FaRegListAlt,
  "/vendor/orders": FaRegListAlt,
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
        <div className="flex-grow p-4 overflow-y-auto ml-0 md:ml-64 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
