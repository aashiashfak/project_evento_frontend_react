import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const AdminLoginRedirect = ({children}) => {
  const {role, accessToken} = useSelector((state) => state.user);
    console.log('entered AdminLogin Redirect')
  if (accessToken && role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  if (accessToken && role !== 'admin'){
    return <Navigate to='/'/>
  }

  return children;
};

export default AdminLoginRedirect;
