import React from "react";
import {useNavigate} from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Session Expired</h1>
      <p className="mb-4">Your session has expired. Please log in again.</p>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Login
      </button>
    </div>
  );
};

export default SessionExpired;
