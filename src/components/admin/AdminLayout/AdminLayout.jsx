import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../sidebar/SideBar";
import {
  FaHome,
  FaThList,
  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import {BiSolidCarousel} from "react-icons/bi";

const adminNavItems = [
  {path: "/admin/dashboard", label: "Dashboard"},
  {path: "/admin/categories", label: "Categories"},
  {path: "/admin/locations", label: "Locations"},
  {path: "/admin/banners", label: "Banners"},
  {path: "/admin/users", label: "Users"},
  {path: "/admin/organizers", label: "Organizers"},
];

const adminIconMap = {
  "/admin/dashboard": FaHome,
  "/admin/categories": FaThList,
  "/admin/locations": FaMapMarkerAlt,
  "/admin/banners": BiSolidCarousel,
  "/admin/users": FaUsers,
  "/admin/organizers": FaUserTie,
};

const AdminLayout = ({isSidebarVisible, onToggleSidebar}) => {
  return (
    <div className="flex">
      <Sidebar
        isVisible={isSidebarVisible}
        navItems={adminNavItems}
        iconMap={adminIconMap}
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

export default AdminLayout;
