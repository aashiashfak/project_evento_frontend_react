import React, {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";
import {Spinner} from "../components/spinner/Spinner";
import UserLayout from "../components/userLayout/UserLayout";

const EmailSignIn = lazy(() => import("../pages/user/EmailSignIn"));
const MobileSignIn = lazy(() => import("../pages/user/MobileSignIn"));
const OtpComponent = lazy(() => import("../components/accounts/OtpComponent"));
const Login = lazy(() => import("../pages/user/Login"));
const Homepage = lazy(() => import("../pages/user/Homepage"));
const ListYourEvents = lazy(() => import("../pages/user/ListYourEvents"));
const AboutUs = lazy(() => import("../pages/user/AboutUs"));
const Contact = lazy(() => import("../pages/user/Contact"));
const AllEvents = lazy(() => import("../pages/user/AllEvents"));
const SessionExpired = lazy(() => import("../components/Error/SessionExpired"));
const EventDetail = lazy(() => import("../pages/user/EventDetail"));
const TicketTypes = lazy(() => import("../pages/user/TicketTypes"));
const SearchResults = lazy(() => import("../pages/user/SearchResults"));
const RedirectAuthenticated = lazy(() =>
  import("../components/Protecters/RedirectAuthenticated")
);
const WishLIst = lazy(() => import("../pages/user/WishLIst"));
const RequireAuth = lazy(() => import("../components/Protecters/RequireAuth"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const ConfirmPayment = lazy(() => import("../pages/user/ConformPayment"));
const UserTicketsPage = lazy(() => import("../pages/user/UserTicketsPage"));

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
        <Route path="/session-expired" element={<SessionExpired />} />
        <Route path="/ticket-types/:id" element={<TicketTypes />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/confirm-payment" element={<ConfirmPayment />} />
        <Route element={<UserLayout />}>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/all-events/:categoryName?" element={<AllEvents />} />
          <Route path="/event-details/:eventID" element={<EventDetail />} />
        </Route>

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
