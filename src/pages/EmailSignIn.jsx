import React, {useState} from "react";
import {ClipLoader} from "react-spinners";
import axiosInstance from "../api/axiosInstance";
import OtpComponent from "../components/accounts/OtpComponent";
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setMessage("Please enter your email");
      return;
    } else if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("accounts/email-otp-request/", {
        email,
      });
      if (response.status === 200) {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-28 flex justify-center items-center ">
      {!isOtpSent ? (
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md relative">
          <button
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
            onClick={() => navigate("/Login")}
          >
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Login with Email
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none"
          />
          <div className="flex justify-center">
            <button
              className="w-full bg-violet-500 text-white p-3 rounded-lg shadow hover:bg-violet-800"
              onClick={handleEmailLogin}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Submit"}
            </button>
          </div>

          {message && (
            <p className="text-red-500 mt-4 text-center">{message}</p>
          )}
        </div>
      ) : (
        <OtpComponent
          identifier={"email"}
          email={email}
          handleOtpSent={setIsOtpSent}
        />
      )}
    </div>
  );
};

export default EmailSignIn;
