import {Route, Routes} from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import AdminProtectedRoute from "../components/admin/Protecters/AdminProtectedRoute";
import AdminLoginRedirect from "../components/admin/Protecters/AdminLoginRedirect";

const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <AdminLoginRedirect>
            <AdminLogin />
          </AdminLoginRedirect>
        }
      />
      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashBoard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRouter;
