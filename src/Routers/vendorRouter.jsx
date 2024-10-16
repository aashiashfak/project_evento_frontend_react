import {Route, Routes} from "react-router-dom";
import VendorSignUp from "../pages/vendor/VendorSignup"; 
import VendorLoginRedirect from "../components/vendor/protecters/VendorLoginRedirect";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import VendorProtectedRoute from "../components/vendor/protecters/VendorProtectedRoute";
import VendorLayout from "../components/vendor/vendorLayout/VendorLayout";
import Events from "../pages/vendor/Events";
import EventPage from "../pages/vendor/EventPage";
import EventTickets from "../pages/vendor/EventTickets";
import VendorProfile from "../pages/vendor/VendorProfile";
import BookedTicketsTable from "../pages/vendor/BookedTickets";
import PageNotFound from "../components/Error/PageNotFound";



const VendorRouter = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <VendorLoginRedirect>
            <VendorSignUp />
          </VendorLoginRedirect>
        }
      />
      <Route
        path="/"
        element={
          <VendorProtectedRoute>
            <VendorLayout />
          </VendorProtectedRoute>
        }
      >
        <Route path="/" element={<VendorDashboard />} />
        <Route path="/profile" element={<VendorProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/booked-tickets" element={<BookedTicketsTable />} />
        <Route path="/add-event" element={<EventPage />} />
        <Route path="/edit-event/:eventId" element={<EventPage />} />
        <Route
          path="/event-tickets/:eventId/:eventName"
          element={<EventTickets />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default VendorRouter;
