import {Route, Routes} from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashBoard from "../pages/admin/AdminDashBoard";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="Login" element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminDashBoard />} />
    </Routes>
  );
};

export default AdminRouter;
