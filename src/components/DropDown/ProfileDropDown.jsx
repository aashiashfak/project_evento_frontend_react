import React from "react";
import DropDownMenu from "./DropDownMenu";
import {FaUser, FaHeart, FaSignOutAlt, FaTicketAlt} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { clearUser } from "../../redux/userSlice";
import { clearWishListItems } from "../../redux/WishListSlice";


const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleLogout = () => {
     dispatch(clearUser());
     dispatch(clearWishListItems())
     navigate("/login");
   };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="text-sm text-gray-600 ">
      <div
        className="px-5 py-3 cursor-pointer"
        onClick={() => handleNavigation("/user-profile")}
      >
        <DropDownMenu icon={<FaUser />} title="My Profile" />
      </div>
      <hr className="w-[170px] mx-auto bg-gray-400 h-px border-none"></hr>
      <div
        className="px-5 py-3 cursor-pointer"
        onClick={() => handleNavigation("/wishlist")}
      >
        <DropDownMenu icon={<FaHeart />} title="Wishlist" />
      </div>
      <hr className="w-[170px] mx-auto bg-gray-400 h-[1.5px] border-none "></hr>
      <div
        className="px-5 py-3 cursor-pointer"
        onClick={() => handleNavigation("/user-tickets")}
      >
        <DropDownMenu icon={<FaTicketAlt />} title="Your Tickets" />
      </div>
      <hr className="w-[170px] mx-auto bg-gray-400 h-[1.5px] border-none "></hr>
      <div className="px-5 py-3 cursor-pointer" onClick={handleLogout}>
        <DropDownMenu icon={<FaSignOutAlt />} title="Logout" />
      </div>
    </div>
  );
};

export default ProfileDropdown;
