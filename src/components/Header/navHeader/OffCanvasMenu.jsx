import React from "react";
import {Link} from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import { useSelector } from "react-redux";


const OffCanvasMenu = ({isVisible, onClose}) => {
  const user = useSelector((state)=>state.user)
  return (
    <div
      className={`fixed inset-0 z-30 transition-transform transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } sm:hidden`}
    >
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute right-0  top-0 w-1/2 h-full bg-white">
        <button className="ml-60 mt-6" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <div className="flex flex-col">
          <div>
            {user.accessToken && (
              <div className="px-5 pb-4 text-lg font-semibold">
                <h1> Hi {user.username}</h1>
              </div>
            )}
          </div>
          <div className="hover:bg-gray-200 px-5 py-2 shadow-sm">
            <Link to="/" onClick={onClose}>
              Home
            </Link>
          </div>
          <div className="hover:bg-gray-200 px-5 py-2 shadow-sm">
            <Link to="/about" onClick={onClose}>
              About Us
            </Link>
          </div>
          <div className="hover:bg-gray-200 px-5 py-2 shadow-sm">
            <Link to="/contact" onClick={onClose}>
              Contact us
            </Link>
          </div>
          <div className="hover:bg-gray-200 px-5 py-2 shadow-sm">
            <Link to="/about" onClick={onClose}>
              About Us
            </Link>
          </div>
          <div className="hover:bg-gray-200 px-5 py-2shadow-sm">
            <Link to="/list-your-events" onClick={onClose}>
              List Your Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
