import React from "react";
import {
  FaUser,
  FaHome,
  FaThList,
  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
  FaRegEdit,
} from "react-icons/fa";
import {BiSolidCarousel} from "react-icons/bi";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const navItems = [
  {path: "/admin/dashboard", label: "Dashboard"},
  {path: "/admin/categories", label: "Categories"},
  {path: "/admin/locations", label: "Locations"},
  {path: "/admin/banners", label: "Banners"},
  {path: "/admin/users", label: "Users"},
  {path: "/admin/organizers", label: "Organizers"},
];

const iconMap = {
  "/admin/dashboard": FaHome,
  "/admin/categories": FaThList,
  "/admin/locations": FaMapMarkerAlt,
  "/admin/banners": BiSolidCarousel,
  "/admin/users": FaUsers,
  "/admin/organizers": FaUserTie,
};

const Sidebar = ({isVisible}) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const baseUrl = "http://localhost:8000/";
  const navigate = useNavigate();

  console.log("user from Redux store", user);

  return (
    <aside
      className={`z-30 fixed top-[81px] left-0 w-64 h-[calc(100vh-81px)] bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:flex-shrink-0`}
    >
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
          {user.profilePicture ? (
            <img
              src={
                user.profilePicture.startsWith("http")
                  ? user.profilePicture
                  : `${baseUrl}${user.profilePicture}`
              }
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
          ) : (
            <FaUser className="w-12 h-12 text-gray-500 mb-2" />
          )}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <p className="font-semibold">
            {user.username ? user.username : "guest"}
          </p>
          <button
            className="text-white rounded"
            onClick={() => navigate("/admin/profile")}
          >
            <FaRegEdit />
          </button>
        </div>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => {
            const Icon = iconMap[item.path];
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center p-2 text-white rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  <Icon className="mr-2" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Sidebar;
