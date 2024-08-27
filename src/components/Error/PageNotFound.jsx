import React from "react";
import {useNavigate} from "react-router-dom";
import notFoundImg from "../../assets/StaticImages/404pageNotFound.webp";
import {useSelector} from "react-redux";

const PageNotFound = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);

  const handleBackToHome = () => {
    const redirectPath =
      role === "admin"
        ? "/admin/dashboard"
        : role === "vendor"
        ? "/vendor/"
        : "/";
    navigate(redirectPath);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-3">
      <img
        src={notFoundImg}
        alt="404 - Page Not Found Illustration"
        className="max-w-full max-h-80"
      />
      <p className="text-lg text-gray-600 mt-4 text-center">
        So sorry, we couldn't find what you were looking for...
      </p>
      <button
        onClick={handleBackToHome}
        className="mt-6 bg-violet-700 text-white px-6 py-3 rounded-lg transition duration-200 transform hover:bg-violet-900 hover:scale-105"
      >
        Back to the homepage
      </button>
    </div>
  );
};

export default PageNotFound;
