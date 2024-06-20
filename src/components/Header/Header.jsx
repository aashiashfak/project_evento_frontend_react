import React, { useState} from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SIgnInOrUser from "./SIgnInOrUser";
import OffCanvasMenu from "../Header/navHeader/OffCanvasMenu";
import {FaBars} from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";
// import {useDispatch} from "react-redux";
// import { setLocationId } from "../../redux/locationSlice";

const Header = ({locations}) => {
  const [navVisible, setNavVisible] = useState(false);

  return (
    <div className="sticky top-0 z-20 flex flex-col sm:flex-row items-center justify-between px-6 py-3 shadow-md bg-white">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Logo />
        <div className="flex sm:hidden items-center">
          <SIgnInOrUser />
          <button
            className="text-gray-800 ml-2"
            onClick={() => setNavVisible(true)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full mt-4 sm:mt-0 sm:mx-4">
        <SearchBar
          locations={locations}
          // onLocationChange={handleLocationChange}
        />
      </div>
      <div className="hidden sm:flex items-center space-x-4">
        <SIgnInOrUser />
      </div>
      <OffCanvasMenu
        isVisible={navVisible}
        onClose={() => setNavVisible(false)}
      />
    </div>
  );
};

export default Header;
