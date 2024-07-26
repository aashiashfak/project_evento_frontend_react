import React, {useState} from "react";
import {FaArrowLeft, FaEye, FaEyeSlash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { LoginRequest } from "../../api/adminApi/LoginRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username ,setUsername] = useState("");
  const [password ,setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('entered handle login')
    try {
        const responseData = await LoginRequest(username, password);
        console.log('responseData', responseData)
        dispatch(setUser({
            username:responseData.user.username,
            accessToken:responseData.access_token,
            refreshToken:responseData.refresh_token,
            role:responseData.user.role,
        }))
        navigate('/admin/dashboard');
    }catch(error){
        const errorMessage =
          error.response && error.response.data.non_field_errors
            ? error.response.data.non_field_errors[0]
            : "Login failed. Please check your username and password.";
        setMessage(errorMessage);
        console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-md w-full p-6 rounded-3xl shadow-2xl relative">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-center mt-7">Admin Login</h1>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username " className="block text-sm font-medium">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-black focus:outline-none"
            />
          </div>
          <div className="relative " style={{marginTop: "10px"}}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-black pr-10"
            />
            <div
              className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div
            className="text-red-600 text-sm  min-h-[1.5rem]"
            style={{marginTop: "10px"}}
          >
            {message && <p>{message}</p>}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-800 w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
