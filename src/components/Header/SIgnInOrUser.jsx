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
        console.log(dropdownOpen)
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev); 
  };

  return (
    <div className="relative " ref={dropdownRef}>
      {user.accessToken ? (
        <div className="flex items-center space-x-2 ">
          <span className="font-semibold hidden md:block">
            {user.username || "Guest"}
          </span>
          <div className="p-2 hover:bg-gray-400 rounded-full cursor cursor-pointer transform duration-300 ease-in-out">
            <FaUser
              className="text-violet-700 cursor-pointer transform duration-300 ease-in-out "
              onClick={handleToggleDropdown}
            />
          </div>
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
        className={`Profile-drop-down-menu dropdown-menu absolute right-0 mt-2 w-48 bg-gray-200 py-1 rounded-md shadow-lg z-20 ${
          dropdownOpen ? "active" : "inactive"
        }`}
      >
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default SignInOrUser;
