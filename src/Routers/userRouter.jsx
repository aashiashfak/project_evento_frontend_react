import React, {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";
import {Spinner} from "../components/spinner/Spinner";

const EmailSignIn = lazy(() => import("../pages/EmailSignIn"));
const MobileSignIn = lazy(() => import("../pages/MobileSignIn"));
const OtpComponent = lazy(() => import("../components/accounts/OtpComponent"));
const Login = lazy(() => import("../pages/Login"));
const Homepage = lazy(() => import("../pages/Homepage"));
const ListYourEvents = lazy(() => import("../pages/ListYourEvents"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Contact = lazy(() => import("../pages/Contact"));
const AllEvents = lazy(() => import("../pages/AllEvents"));
const SessionExpired = lazy(() => import("../components/Error/SessionExpired"));
const EventDetail = lazy(() => import("../pages/EventDetail"));
const TicketTypes = lazy(() => import("../pages/TicketTypes"));
const SearchResults = lazy(() => import("../pages/SearchResults"));
const RedirectAuthenticated = lazy(() =>
  import("../components/Protecters/RedirectAuthenticated")
);
const WishLIst = lazy(() => import("../pages/WishLIst"));
const RequireAuth = lazy(() => import("../components/Protecters/RequireAuth"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const ConfirmPayment = lazy(() => import("../pages/ConformPayment"));
const UserTicketsPage = lazy(() => import("../pages/UserTicketsPage"));

const UserRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticated>
              <Login />
            </RedirectAuthenticated>
          }
        />
        <Route path="/email-signin" element={<EmailSignIn />} />
        <Route path="/mobile-signin" element={<MobileSignIn />} />
        <Route path="/otp" element={<OtpComponent />} />
        <Route path="/list-your-events" element={<ListYourEvents />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-events/:categoryName?" element={<AllEvents />} />
        <Route path="/session-expired" element={<SessionExpired />} />
        <Route path="/event-details/:eventID" element={<EventDetail />} />
        <Route path="/ticket-types/:id" element={<TicketTypes />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/confirm-payment" element={<ConfirmPayment />} />

        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishLIst />
            </RequireAuth>
          }
        />
        <Route
          path="/user-profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/user-tickets"
          element={
            <RequireAuth>
              <UserTicketsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default UserRouter;
