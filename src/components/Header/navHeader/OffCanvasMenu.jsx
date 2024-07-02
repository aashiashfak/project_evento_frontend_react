import React from "react";
import {Link, useLocation} from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaEnvelope,
  FaListAlt,
} from "react-icons/fa";
import {useSelector} from "react-redux";

const OffCanvasMenu = ({isVisible, onClose}) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const navItems = [
    {path: "/", label: "Home"},
    {path: "/all-events", label: "All Events", isDynamic: true},
    {path: "/about", label: "About Us"},
    {path: "/contact", label: "Contact Us"},
    {path: "/list-your-events", label: "List Your Events"},
  ];

  const iconMap = {
    "/": FaHome,
    "/all-events": FaCalendarAlt,
    "/about": FaInfoCircle,
    "/contact": FaEnvelope,
    "/list-your-events": FaListAlt,
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
    >
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 w-1/2 h-full bg-white">
        <button
          className="ml-4 mt-3 mb-5 peer-hover:text-black"
          onClick={onClose}
        >
          <FaArrowLeft size={20} />
        </button>
        <div className="flex flex-col">
          {user.accessToken && (
            <div className="px-5 pb-4 text-lg font-semibold">
              <h1>Hi {user.username || "guest"}</h1>
            </div>
          )}
          {navItems.map((item) => {
            const Icon = iconMap[item.path];
            return (
              <div
                key={item.path}
                className={`px-5 py-2 shadow-sm transition duration-300 ease-in-out ${
                  location.pathname === item.path ||
                  (item.isDynamic && location.pathname.startsWith(item.path))
                    ? "bg-violet-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Link
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center"
                >
                  <Icon className="mr-2" />
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
