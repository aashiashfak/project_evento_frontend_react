import React from "react";
import { handleGoogleLoginSuccess } from "../../utilities/utils";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function GoogleSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        console.log(credentialResponse);
        try {
          const data = await handleGoogleLoginSuccess(credentialResponse,navigate,dispatch);
        } catch (error) {
          console.error("Login process failed", error);
        }
      }}
      onError={() => console.log("Login Failed")}
    />
  );
}

export default GoogleSignIn;
