import React from "react";
import {Link} from "react-router-dom";

const NavHeader = () => {
  return (
    <div className="hidden sm:flex bg-gray-100 p-2 justify-between w-full">
      <div className="flex">
        <Link to="/" className="mx-4">
          Home
        </Link>
        <Link to="/all-events" className="mx-4">
          All Events
        </Link>
        <Link to="/contact" className="mx-4">
          Contact us
        </Link>
        <Link to="/about" className="mx-4">
          About Us
        </Link>
      </div>
      <div className="">
        <Link to="/list-your-events" className="mx-4">
          List Your Events
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
