import React from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import GoogleSignIn from "../components/accounts/GoogleSignIn" 


function SignUpCard() {
  const navigate = useNavigate();
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full relative">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <p className="mb-8 text-center">
          "Sign In To Effortlessly Purchase Tickets And Unlock Exclusive Event
          Access. Your Seamless Booking Experience Awaits!"
        </p>
        <div className="flex flex-col items-center space-y-6">
          <GoogleSignIn />
          <button
            className="bg-white border border-gray-300 py-3 px-6 rounded shadow hover:bg-gray-50 hover:border-violet-700 transition w-64"
            onClick={() => navigate("/email-signin")}
          >
            <span className="mr-2">@</span> Sign In With Email
          </button>
          <button
            className="bg-white border border-gray-300 py-3 px-6 rounded shadow hover:bg-gray-50  hover:border-violet-700 transition w-64"
            onClick={() => navigate("/mobile-signin")}
          >
            <span className="mr-2">📞</span> Sign In with Number
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpCard;
