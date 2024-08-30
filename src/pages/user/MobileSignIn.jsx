import React, {useState, useEffect} from "react";
import {ClipLoader} from "react-spinners";
import OtpComponent from "../../components/accounts/OtpComponent";
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "../../css/Global.css";
import {phoneOtpRequest} from "../../api/auth/phoneOtpRequest";

const MobileSignIn = () => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const navigate = useNavigate();

  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid = phoneRegex.test(phone);
      setIsPhoneValid(isValid);
      if (phone && !isValid) {
        setMessage("Please enter a valid 10-digit phone number");
      } else {
        setMessage("");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [phone]);

  const handlePhoneLogin = async () => {
    if (!isPhoneValid) {
      setMessage("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await phoneOtpRequest(phone);
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
    <div className="mt-28 flex justify-center items-center p-4">
      {!isOtpSent ? (
        <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl h-96 relative">
          <button
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
            onClick={() => navigate("/Login")}
          >
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-20">
            Login with Phone
          </h2>
          <div className="flex items-center mb-2">
            <span className="p-2 bg-gray-200 border border-gray-300 rounded-l-md">
              +91
            </span>
            <input
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                return setPhone(e.target.value), setMessage("");
              }}
              className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none no-spin"
              style={{
                appearance: "textfield",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
            />
          </div>
          <p className="text-red-500 mt-2 mb-4 text-sm ">{message}</p>
          <button
            className={`w-full p-3 rounded-lg shadow transition ${
              isPhoneValid
                ? "bg-violet-700 text-white hover:bg-violet-800"
                : "bg-gray-400 opacity-30 cursor-default"
            }`}
            onClick={handlePhoneLogin}
            disabled={!isPhoneValid || isLoading}
          >
            {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Submit"}
          </button>
        </div>
      ) : (
        <OtpComponent
          identifier="phone"
          phone={`+91${phone}`}
          handleOtpSent={setIsOtpSent}
        />
      )}
    </div>
  );
};

export default MobileSignIn;
