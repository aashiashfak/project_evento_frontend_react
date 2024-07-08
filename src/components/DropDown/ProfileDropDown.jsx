import React from "react";
import DropDownMenu from "./DropDownMenu";
import {FaUser, FaHeart, FaSignOutAlt} from "react-icons/fa";
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
     localStorage.setItem("logoutMessage", "true");
     navigate("/login");
   };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="text-sm text-gray-600">
      <div
        className="px-5 py-3 cursor-pointer"
        onClick={() => handleNavigation("/user-profile")}
      >
        <DropDownMenu icon={<FaUser />} title="My Profile" />
      </div>
      <hr className="w-[155px] mx-auto bg-white h-px border-none"></hr>
      <div
        className="px-5 py-3 cursor-pointer"
        onClick={() => handleNavigation("/wishlist")}
      >
        <DropDownMenu icon={<FaHeart />} title="Wishlist" />
      </div>
      <hr className="w-[155px] mx-auto bg-white h-[1.5px] border-none"></hr>
      <div className="px-5 py-3 cursor-pointer" onClick={handleLogout}>
        <DropDownMenu icon={<FaSignOutAlt />} title="Logout" />
      </div>
    </div>
  );
};

export default ProfileDropdown;
