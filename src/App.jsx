import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EmailSignIn from "./pages/EmailSignIn";
import MobileSignIn from "./pages/MobileSignIn";
import OtpComponent from "./components/accounts/OtpComponent";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ListYourEvents from "./pages/ListYourEvents";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import AllEvents from "./pages/AllEvents";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/email-signin" element={<EmailSignIn />} />
        <Route path="/mobile-signin" element={<MobileSignIn />} />
        <Route path="/otp" element={<OtpComponent />} /> 
        <Route path="/list-your-events" element={<ListYourEvents />} /> 
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-events" element={<AllEvents />} />
      </Routes>
    </Router>
  );
};

export default App;
