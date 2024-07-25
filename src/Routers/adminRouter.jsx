import {Route, Routes} from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import AdminProtectedRoute from "../components/admin/Protecters/AdminProtectedRoute";
import AdminLoginRedirect from "../components/admin/Protecters/AdminLoginRedirect";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

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
        path="/"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashBoard />} />
        {/* Add other admin routes here */}
      </Route>
    </Routes>
  );
};

export default AdminRouter;
