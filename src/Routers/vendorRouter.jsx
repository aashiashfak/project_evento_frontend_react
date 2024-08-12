import {Route, Routes} from "react-router-dom";
import VendorSignUp from "../pages/vendor/VendorSignup"; 
import VendorLoginRedirect from "../components/vendor/protecters/VendorLoginRedirect";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import VendorProtectedRoute from "../components/vendor/protecters/VendorProtectedRoute";
import VendorLayout from "../components/vendor/vendorLayout/VendorLayout";
import Events from "../pages/vendor/Events";
import CreateEventPage from "../pages/vendor/EventCreate";



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
        <Route path="/events" element={<Events />} />
        <Route path="/add-events" element={<CreateEventPage />} />
      </Route>
    </Routes>
  );
};

export default VendorRouter;
