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
import SessionExpired from "./components/Error/SessionExpired";
import EventDetail from "./pages/EventDetail";
import TicketTypes from "./pages/TicketTypes";
import SearchResults from "./pages/SearchResults";
import RedirectAuthenticated from "./components/Protecters/RedirectAuthenticated";
import WishLIst from "./pages/WishLIst";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<RedirectAuthenticated><Login /></RedirectAuthenticated>} />
        <Route path="/email-signin" element={<EmailSignIn />} />
        <Route path="/mobile-signin" element={<MobileSignIn />} />
        <Route path="/otp" element={<OtpComponent />} />
        <Route path="/list-your-events" element={<ListYourEvents />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-events/:categoryName?" element={<AllEvents />} />
        <Route path="/session-expired" element={<SessionExpired />} />
        <Route path="event-details/:eventID" element={<EventDetail />} />
        <Route path="ticket-types/:id" element={<TicketTypes />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/wish-list" element={<WishLIst />} />
      </Routes>
    </Router>
  );
};

export default App;
