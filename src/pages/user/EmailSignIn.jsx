import React, {useState, useEffect} from "react";
import {ClipLoader} from "react-spinners";
import OtpComponent from "../../components/accounts/OtpComponent";
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {emailOtpRequest} from "../../api/auth/emailOtpRequest";

const EmailSignIn = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid = emailRegex.test(email);
      setIsEmailValid(isValid);
      if (email && !isValid) {
        setMessage("Please enter a valid email address");
      } else {
        setMessage("");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [email]);

  const handleEmailLogin = async () => {
    if (!isEmailValid) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await emailOtpRequest(email);
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
        <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl relative h-96">
          <button
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
            onClick={() => navigate("/Login")}
          >
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-20">
            Login with Email
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
            className={"w-full p-2 border rounded mb-2 focus:outline-none"}
          />
          <p className="text-red-500 mt-2 mb-4 text-center ">{message}</p>
          <div className="flex justify-center">
            <button
              className={`w-full p-3 rounded-lg shadow transition ${
                isEmailValid
                  ? "bg-violet-500 text-white hover:bg-violet-800"
                  : "bg-gray-400 cursor-defualt opacity-30"
              }`}
              onClick={handleEmailLogin}
              disabled={!isEmailValid || isLoading}
            >
              {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Submit"}
            </button>
          </div>
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
