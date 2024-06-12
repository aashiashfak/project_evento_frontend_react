import React, {useState} from "react";
import {ClipLoader} from "react-spinners";
import axiosInstance from "../api/axiosInstance";
import OtpComponent from "../components/accounts/OtpComponent";

const MobileSignIn = () => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePhoneLogin = async () => {
    if (phone.length !== 10) {
      setMessage("Please enter a 10-digit phone number");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const response = await axiosInstance.post("accounts/phone-otp-request/", {
        phone_number: `+91${phone}`,
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
    <div className="mt-28 flex justify-center items-center min-h-screen">
      {!isOtpSent ? (
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Login with Phone
          </h2>
          <div className="flex items-center mb-6">
            <span className="p-2 bg-gray-200 border border-gray-300 rounded-l-md">
              +91
            </span>
            <input
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
            />
          </div>
          <button
            className="w-full bg-violet-500 text-white p-3 rounded-lg shadow hover:bg-violet-800"
            onClick={handlePhoneLogin}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Submit"}
          </button>
          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        </div>
      ) : (
        <OtpComponent identifier="phone" phone={`+91${phone}`} />
      )}
    </div>
  );
};

export default MobileSignIn;
