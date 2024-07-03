import React, {useState, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "../../redux/userSlice";
import axiosInstance from "../../api/axiosInstance";
import {ClipLoader} from "react-spinners";
import {FaArrowLeft} from "react-icons/fa";

const OtpComponent = (props) => {
  const {identifier, email, phone, handleOtpSent} = props;
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("identifier", identifier);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        otpRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").split("").slice(0, 6);
    const newOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (!isNaN(char)) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
    otpRefs.current[pasteData.length - 1]?.focus();
  };

  const handleOtpForm = async (event) => {
    console.log("entered in handling submitted otp");
    event.preventDefault();
    const enteredOtp = otp.join("");
    console.log(enteredOtp);
    setIsLoading(true);

    try {
      let response;
      if (identifier === "email") {
        response = await axiosInstance.post(
          "accounts/email-otp-verification/",
          {
            otp: enteredOtp,
            email: email,
          }
        );
      } else if (identifier === "phone") {
        console.log("identifier is phone");
        response = await axiosInstance.post(
          "accounts/phone-otp-verification/",
          {
            otp: enteredOtp,
            phone_number: phone,
          }
        );
      }

      const userData = response.data;
      console.log(userData);
      dispatch(
        setUser({
          username: userData.user.username || null,
          accessToken: userData.access_token,
          refreshToken: userData.refresh_token,
        })
      );
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButtonClick = () => {
    handleOtpSent(false)
  };


  const isOtpFilled = otp.every((digit) => digit !== "");

  return (
    <div className="shadow-md p-6 rounded relative">
      <button
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
        onClick={handleBackButtonClick}
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="mt-2 text-center text-sm text-gray-700 mb-2">
        <p>OTP sent to {identifier === "phone" ? phone : email}</p>
      </div>
      <form onSubmit={handleOtpForm}>
        <label className="block text-sm text-black mb-2">
          Enter OTP for verification
        </label>
        <div className="flex space-x-2 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onPaste={handleOtpPaste}
              ref={(el) => (otpRefs.current[index] = el)}
              className="w-12 h-12 border border-gray-300 rounded-md pl-4 py-3 focus:outline-none focus:border-violet-600"
              required
            />
          ))}
        </div>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md transition duration-200 ${
            isOtpFilled
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!isOtpFilled || isLoading}
        >
          {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpComponent;
