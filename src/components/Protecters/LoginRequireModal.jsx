import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginRequireModal = ({onClose}) => {
    const navigate = useNavigate();

    const handleClose = () => {
      console.log("onClose called"); // Debugging line
      if (onClose) {
        onClose();
      }
    };
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-30 p-4 text-center"
      onClick={onClose}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 h-80 relative">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
          onClick={handleClose}
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-6">Login Required</h2>
        <p className="mb-10">
          You need to be logged in to add events to your wishlist or book tickets of an event
        </p>
        <button
          className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-800"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default LoginRequireModal;
