import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserRouter from "./Routers/userRouter";
import AdminRouter from "./Routers/adminRouter";
import {ToastContainer} from "react-toastify";
import VendorRouter from "./Routers/vendorRouter";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="admin/*" element={<AdminRouter />} />
        <Route path="vendor/*" element={<VendorRouter />} />
      </Routes>
    </Router>
  );
};

export default App;
