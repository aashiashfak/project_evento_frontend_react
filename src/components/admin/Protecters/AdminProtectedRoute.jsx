import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const AdminProtectedRoute = ({children}) => {
  const user = useSelector((state) => state.user);

  if (!user.accessToken) {
    return <Navigate to="/admin/login" />;
  }

  if (user.role !== "admin") {
    // If the user is not an admin, redirect to the homepage or another appropriate page
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the children components
  return children;
};

export default AdminProtectedRoute;
