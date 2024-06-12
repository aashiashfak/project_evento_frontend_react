import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EmailSignIn from "./pages/EmailSignIn";
import MobileSignIn from "./pages/MobileSignIn";
import OtpComponent from "./components/accounts/OtpComponent";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/email-signin" element={<EmailSignIn />} />
        <Route path="/mobile-signin" element={<MobileSignIn />} />
        <Route path="/otp" element={<OtpComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
