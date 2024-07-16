import React, {useState} from "react";
import {handleGoogleLoginSuccess} from "../../api/auth/googleLogin";
import {GoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";

function GoogleSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ClipLoader size={35} color={"#123abc"} loading={isLoading} />
        </div>
      ) : (
        <GoogleLogin
          text="sign in with Google"
          width="240px"
          shape="pill"
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
            setIsLoading(true); // Start loading
            try {
              const data = await handleGoogleLoginSuccess(
                credentialResponse,
                navigate,
                dispatch
              );
            } catch (error) {
              console.error("Login process failed", error);
            } finally {
              setIsLoading(false); // Stop loading
            }
          }}
          onError={() => {
            console.log("Login Failed");
            setIsLoading(false); // Ensure loading is stopped in case of an error
          }}
        />
      )}
    </div>
  );
}

export default GoogleSignIn;
