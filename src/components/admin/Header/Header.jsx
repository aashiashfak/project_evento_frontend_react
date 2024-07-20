import React from 'react'
import Logo from '../../Header/Logo'
import {FaBars} from "react-icons/fa";

const Header = ({onToggleSidebar}) => {
  return (
    <div className="p-6 flex justify-between sticky top-0 shadow-lg">
      <div className="flex justify-around gap-4">
        <div className="block sm:hidden mt-3">
          <FaBars onClick={onToggleSidebar} />
        </div>
        <div>
          <Logo />
        </div>
      </div>
      <div>
        <button className="bg-black rounded-lg px-4 py-1 text-white transition duration-300 hover:opacity-80">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header
