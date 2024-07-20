import React, {useState} from "react";
import {
  FaUser,
  FaHome,
  FaThList,
  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
  FaRegEdit,
} from "react-icons/fa";

const navItems = [
  {path: "/dashboard", label: "Dashboard"},
  {path: "/categories", label: "Categories"},
  {path: "/locations", label: "Locations"},
  {path: "/users", label: "Users"},
  {path: "/organizers", label: "Organizers"},
];

const iconMap = {
  "/dashboard": FaHome,
  "/categories": FaThList,
  "/locations": FaMapMarkerAlt,
  "/users": FaUsers,
  "/organizers": FaUserTie,
};

const Sidebar = ({isVisible}) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");

  return (
    <aside
      className={`z-30 fixed top-[81px] left-0 w-64 h-[calc(100vh-81px)] bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:flex-shrink-0`}
    >
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2"
            />
          ) : (
            <FaUser className="w-12 h-12 text-gray-500 mb-2" />
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <p className="font-semibold">{username ? username : "guest"}</p>
          <button className=" text-white rounded">
            <FaRegEdit />
          </button>
        </div>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => {
            const Icon = iconMap[item.path];
            return (
              <li key={item.path} className="mb-2">
                <a
                  href={item.path}
                  className="flex items-center p-2 text-white hover:bg-gray-700 rounded"
                >
                  <Icon className="mr-2" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
