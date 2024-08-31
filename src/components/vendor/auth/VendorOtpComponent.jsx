import React, {useState, useRef, useEffect} from "react";
import {ClipLoader} from "react-spinners";
import {resendOtp} from "../../../api/auth/resendOtp";
import {verifyOtp} from "../../../api/vendorApi/vendorAuth";
import {FaArrowLeft} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setUser, clearUser,} from "../../../redux/userSlice";
import { clearWishListItems } from "../../../redux/WishListSlice";


const OtpModal = ({vendorData, handleOtpSent}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const otpRefs = useRef([]);
  const {email} = vendorData;
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(60);
    setIsRunning(true);
  };

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
    otpRefs.current[otp.length - 1].focus();
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const enteredOtp = otp.join("");
      const response = await verifyOtp({otp: enteredOtp, vendorData});
      console.log("vendor signup response", response);
      handleOtpSent(false);
      console.log("otp verified succussfully");
      console.log("access token of vendor signup", response.access_token);
      console.log("vendor user details", response.user);
      dispatch(clearUser());
      dispatch(clearWishListItems());
      dispatch(
        setUser({
          username: response.vendor.user.username || null,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          role: response.vendor.user.role,
          profilePicture: response.vendor.user.profile_picture,
        })
      );
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);

    try {
      await resendOtp("email", email);
      setMessage("OTP has been resent. Check your email");
      startTimer();
    } catch (error) {
      setMessage("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-md shadow-md w-full max-w-sm h-72">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
          onClick={() => handleOtpSent(false)}
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 mt-10">Verify OTP</h2>
        <div className="flex justify-center mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              type="text"
              value={value}
              onChange={(e) => (handleOtpChange(e, index), setMessage(""))}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              onPaste={handleOtpPaste}
              className="w-12 h-12 border border-gray-300 rounded-md text-center mx-1"
              maxLength={1}
            />
          ))}
        </div>
        {message && <p className="text-sm text-red-600 mb-4">{message}</p>}
        <div>
          {isRunning ? (
            <>
              <button
                onClick={handleVerifyOtp}
                className="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={20} color="#fff" /> : "Verify"}
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Expect OTP in {timeLeft}s
              </p>
            </>
          ) : (
            <button
              onClick={handleResendOtp}
              className="px-4 py-2 bg-gray-300 text-black rounded-md w-full"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={20} color="#000" /> : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
