import React from "react";

const Sidebar = ({isVisible}) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:flex-shrink-0`}
    >
      <div className="flex flex-col items-center">
        <img
          src="/path/to/profile.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full mb-2"
        />
        <p className="text-lg font-semibold">Super_admin</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
          Edit Profile
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
