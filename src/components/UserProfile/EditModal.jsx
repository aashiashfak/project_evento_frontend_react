import React, {useState, useEffect} from "react";
import axiosInstance from "../../utilities/axios/axiosInstance";
import {FaArrowLeft} from "react-icons/fa";
import ProfileOtpComponent from "./ProfileOtpComponent";
import {ClipLoader} from "react-spinners";

const EditModal = ({
  isOpen,
  onRequestClose,
  identifier,
  currentValue,
  onUpdateEmail,
  onUpdatePhoneNumber,
}) => {
  const [newValue, setNewValue] = useState(currentValue);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewValue(currentValue);
      setIsOtpSent(false);
      setError("");
    }
  }, [isOpen, currentValue]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (identifier === "email") {
        if (!emailRegex.test(newValue)) {
          setError("Please enter a valid email address");
          setIsValid(false);
        } else {
          setError("");
          setIsValid(true);
        }
      } else if (identifier === "phone") {
        if (!phoneRegex.test(newValue)) {
          setError("Please enter a valid 10 digit phone number");
          setIsValid(false);
        } else {
          setError("");
          setIsValid(true);
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [newValue, identifier]);

  const handleSendOtp = async () => {
    setError(""); // Reset error message
    setIsLoading(true);
    try {
      if (identifier === "email") {
        await axiosInstance.post("accounts/update-email/", {email: newValue});
        setIsLoading(false);
      } else if (identifier === "phone") {
        await axiosInstance.post("accounts/update-phone/", {
          phone_number: `${`+91`}${newValue}`,
        });
        setIsLoading(false);
      }
      setIsOtpSent(true);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        
        setError(
          error.response.data.email ||
            error.response.data.phone_number ||
            "Error sending OTP. Please try again."
        );
      } else {
        setError("Error sending OTP. Please try again.");
      }
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpVerified = () => {
    onRequestClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 h-80 mx-auto relative">
        {isOtpSent ? (
          <ProfileOtpComponent
            identifier={identifier}
            value={newValue}
            onOtpVerified={handleOtpVerified}
            handleBack={() => setIsOtpSent(false)}
            onUpdatePhoneNumber={onUpdatePhoneNumber}
            onUpdateEmail={onUpdateEmail}
          />
        ) : (
          <>
            <button
              className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
              onClick={onRequestClose}
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-10 mt-3 text-center">
              Edit {identifier}
            </h2>
            <div className="mb-4">
              <input
                type="text"
                value={newValue}
                onChange={(e) => {
                  setNewValue(e.target.value);
                  setError("");
                }}
                className="w-full p-2 border rounded"
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <button
              onClick={handleSendOtp}
              className={`w-full p-3 rounded-lg shadow transition ${
                isValid
                  ? "bg-violet-500 text-white hover:bg-violet-800"
                  : "bg-gray-400 cursor-defualt opacity-30"
              }`}
              disabled={!isValid}
            >
              {isLoading ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Verify OTP"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default EditModal;
