import React from "react";
import Logo from "../../Header/Logo";
import {FaBars} from "react-icons/fa";
import { clearUser } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({onToggleSidebar}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch(clearUser())
    navigate('/admin/login')
  }
  return (
    <div className="p-6 flex justify-between sticky top-0 bg-white shadow-lg z-50">
      <div className="flex justify-around gap-4">
        <div className="block md:hidden mt-3">
          <FaBars onClick={onToggleSidebar} />
        </div>
        <div>
          <Logo />
        </div>
      </div>
      <div onClick={handleLogout}>
        <button className="bg-black rounded-lg px-4 py-1 text-white transition duration-300 hover:opacity-80">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
