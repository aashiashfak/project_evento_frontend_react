import React, { useState } from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const VendorProtectedRoute = ({children}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const user = useSelector((state) => state.user);

  if (!user.accessToken) {
    return <Navigate to="/vendor/login" />;
  }

  if (user.role !== "vendor") {
    return <Navigate to="/" />;
  }

  return React.cloneElement(children, {
    isSidebarVisible,
    onToggleSidebar: handleToggleSidebar,
  });
};

export default VendorProtectedRoute;
