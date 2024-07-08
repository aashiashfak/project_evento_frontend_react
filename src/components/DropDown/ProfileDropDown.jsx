import React from "react";
import DropDownMenu from "./DropDownMenu";
import {FaUser, FaHeart, FaSignOutAlt} from "react-icons/fa";

const ProfileDropdown = ({username}) => {
  //   const handleLogout = () => {
  //     // Handle logout logic here
  //     navigate("/logout");
  //   };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-gray-700">{username || "Guest"}</p>
        <p className="text-gray-500 text-sm">Website Designer</p>
      </div>
      <DropDownMenu icon={<FaUser />} title="My Profile" />
      <DropDownMenu icon={<FaHeart />} title="Wishlist" />
      <DropDownMenu icon={<FaSignOutAlt />} title="Logout" />
    </div>
  );
};

export default ProfileDropdown;
