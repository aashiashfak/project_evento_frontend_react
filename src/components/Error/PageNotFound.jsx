import React from "react";
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
 const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-3">
      <h1 className="text-9xl text-gray-300">404</h1>
      <p className="text-2xl text-gray-600 mt-4 text-center">
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
