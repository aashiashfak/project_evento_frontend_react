import {setUser} from "../../redux/userSlice";
import axios from "axios";

export const handleGoogleLoginSuccess = async (
  credentialResponse,
  navigate,
  dispatch
) => {
  try {
    const token = credentialResponse.credential;

    console.log("entered in google login");

    // Make an axios call to your API with the token in the body
    const response = await axios.post(
      "http://localhost:8000/accounts/google/oauth1/",
      {access_token: token}, // Use 'access_token' as the key
      {headers: {"Content-Type": "application/json"}}
    );

    console.log("response is okay");

    const data = response.data;
    console.log('response data google ',data)
    dispatch(
      setUser({
        username: data.username,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        role:data.user.role
      })
    );
    navigate("/");

    console.log("API response:", data);

    // Handle the response from your API (e.g., store user info, redirect, etc.)
    return data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("API error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during Google authentication:", error.message);
    }
    throw error; // Re-throw the error after logging it
  }
};
