import React, {useState, useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import {FaUser} from "react-icons/fa";
import ProfileDropdown from "../DropDown/ProfileDropDown";
import {useNavigate} from "react-router-dom";
import "../DropDown/ProfileDropDown.css";

const SignInOrUser = () => {
  const user = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        console.log("uuuuuuuuuuuuuuu");
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative ">
      {user.accessToken ? (
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleToggleDropdown}
        >
          <span className="font-semibold hidden md:block">
            {user.username || "Guest"}
          </span>
          <FaUser className="text-violet-700" />
        </div>
      ) : (
        <button
          className="bg-gray-800 text-white text-sm sm:px-4 sm:py-1 rounded-lg mt-1 px-2 py-1 transition duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105"
          onClick={() => navigate("/Login")}
        >
          Sign In
        </button>
      )}
      <div
        className={`dropdown-menu absolute right-0 mt-2 w-48 bg-gray-200 py-4 rounded-md shadow-lg z-20 ${
          dropdownOpen ? "active" : "inactive"
        }`}
        ref={dropdownRef}
      >
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default SignInOrUser;
