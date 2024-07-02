import React, {useState} from "react";
import Logo from "./Logo";
import SIgnInOrUser from "./SIgnInOrUser";
import OffCanvasMenu from "../Header/navHeader/OffCanvasMenu";
import {FaBars} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavHeader from "./navHeader/NavHeader";


const Header = () => {
  const [navVisible, setNavVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const searchResults = location.pathname === "/search-results";

  return (
    <div className={`sticky top-0 z-20 flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-white ${isHomePage || searchResults ? "" : "shadow-md" }`}>
      <div className="flex items-center justify-between w-full md:w-auto">
        <Logo />
        <div className="flex md:hidden items-center">
          <SIgnInOrUser />
          <button
            className="text-gray-800 ml-2"
            onClick={() => setNavVisible(true)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full mt-4 md:mt-0 md:mx-4">
        <NavHeader/>
      </div>
      <div className="hidden md:flex items-center space-x-4">
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
