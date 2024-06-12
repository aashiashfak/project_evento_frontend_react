import {GoogleLogin} from "@react-oauth/google";
import { handleGoogleLoginSuccess } from "../utilities/utils";

function Login() {
  // const handleSignInWithGoogle = () => {

  // }
  //   useEffect(() => {
  //     // google auth
  //     google.accounts.id.initialize({
  //         client_id:import.meta.env.VITE_CLIENT_ID,
  //         callback:handleSignInWithGoogle
  //     })

  //   })
  return (
    <div className="googleContainer">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse.credential)
          try {
            const data = await handleGoogleLoginSuccess(credentialResponse);
          } catch (error) {
            console.error("Login process failed", error);
          }
        }}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default Login;
