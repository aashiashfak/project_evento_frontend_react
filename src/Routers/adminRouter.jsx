import React, {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="Login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRouter;
