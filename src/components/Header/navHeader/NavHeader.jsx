import React from "react";
import {Link, useLocation} from "react-router-dom";

const NavHeader = () => {
  const location = useLocation();

  const navItems = [
    {path: "/", label: "Home"},
    {path: "/all-events", label: "All Events", isDynamic: true},
    {path: "/contact", label: "Contact us"},
    {path: "/about", label: "About Us"},
    {path: "/list-your-events", label: "List Your Events"},
  ];

  return (
    <div className="hidden sm:flex bg-gray-100 p-2 justify-between w-full shadow-lg sticky top-[65px] z-10 text-sm">
      <div className="flex">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mx-4 ${
              location.pathname === item.path ||
              (item.isDynamic && location.pathname.startsWith(item.path))
                ? "text-violet-700 pointer-events-none font-semibold"
                : "text-black hover:text-violet-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div>
        <Link
          to="/list-your-events"
          className={`mx-4 ${
            location.pathname === "/list-your-events"
              ? "text-violet-700 pointer-events-none font-semibold"
              : "text-black hover:text-violet-700"
          }`}
        >
          List Your Events
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
