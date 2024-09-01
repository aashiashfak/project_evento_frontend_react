import React from "react";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

const NavHeader = () => {
  const location = useLocation();
  const userRole = useSelector((state) => state.user.role);

  const navItems = [
    {path: "/", label: "Home"},
    {path: "/all-events", label: "All Events", isDynamic: true},
    {path: "/contact", label: "Contact"},
    {path: "/about", label: "About"},
  ];

  return (
    <div className="hidden md:flex justify-between w-full text-sm">
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
          to="/vendor/login"
          className={`mx-4 ${
            location.pathname === "/vendor/login" ||
            location.pathname === "/vendor/"
              ? "text-violet-700 pointer-events-none font-semibold"
              : "text-black hover:text-violet-700"
          }`}
        >
          {userRole === "vendor" || userRole === "admin"
            ? "Dashboard"
            : "List Your Events"}
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
