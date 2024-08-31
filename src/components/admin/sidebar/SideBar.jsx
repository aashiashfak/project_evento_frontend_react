import React from "react";
import {FaUser, FaRegEdit} from "react-icons/fa";
import {useSelector} from "react-redux";
import {useLocation, useNavigate, Link} from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({isVisible, navItems, iconMap}) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const baseUrl = "https://api.evento.ink";
  const navigate = useNavigate();

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
            onClick={() => user.role === "admin" ? navigate("/admin/profile") : navigate('/vendor/profile')}
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
                  className={`flex items-center p-2 rounded ${
                    isActive ? "bg-gray-700 text-blue-500 " : "hover:bg-gray-700 text-white"
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
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  iconMap: PropTypes.objectOf(PropTypes.elementType).isRequired,
};

export default Sidebar;
