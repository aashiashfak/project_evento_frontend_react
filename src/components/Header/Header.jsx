import React, {useState} from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SIgnInOrUser from "./SIgnInOrUser";
import NavHeader from "../Header/navHeader/NavHeader";
import OffCanvasMenu from "../Header/navHeader/OffCanvasMenu";
import {FaBars} from "react-icons/fa";

const Header = () => {
  const [navVisible, setNavVisible] = useState(false);

  const locations = [
    {id: "1", name: "Malappuram"},
    {id: "2", name: "Kozhikkode"},
  ];

  return (
    <div className="sticky top-0 z-20 flex flex-col sm:flex-row items-center justify-between p-6 shadow-md bg-white">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Logo />
        <div className="flex sm:hidden items-center">
          <SIgnInOrUser/>
          <button
            className="text-gray-800 ml-2"
            onClick={() => setNavVisible(true)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full mt-4 sm:mt-0 sm:mx-4">
        <SearchBar locations={locations} />
      </div>
      <div className="hidden sm:flex items-center space-x-4">
        <SIgnInOrUser/>
      </div>
      <OffCanvasMenu
        isVisible={navVisible}
        onClose={() => setNavVisible(false)}
      />
    </div>
  );
};

export default Header;
