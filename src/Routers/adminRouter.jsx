import {Route, Routes} from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import AdminProtectedRoute from "../components/admin/Protecters/AdminProtectedRoute";
import AdminLoginRedirect from "../components/admin/Protecters/AdminLoginRedirect";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";
import CategoryList from "../pages/admin/Categories";
import Locations from "../pages/admin/Locations";
import Banner from "../pages/admin/Banner";
import Users from "../pages/admin/Users";

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
        <Route path="categories" element={<CategoryList />} />
        <Route path="locations" element={<Locations />} />
        <Route path="banners" element={<Banner />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
