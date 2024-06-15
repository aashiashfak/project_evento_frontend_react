import React from "react";
import {useSelector} from "react-redux";
import {FaUser} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SIgnInOrUser = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user)
  return (
    <div>
      {user.accessToken ? (
        <div className="flex items-center space-x-2">
          <span className="font-semibold hidden sm:block">
            {user.username || "guest"}
          </span>
          <FaUser className="text-violet-700" />
        </div>
      ) : (
        <button
          className="bg-gray-800 text-white sm:px-4 sm:py-2 rounded-lg mt-1 px-2 py-1 transition duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105"
          onClick={() => navigate("/Login")}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default SIgnInOrUser;
