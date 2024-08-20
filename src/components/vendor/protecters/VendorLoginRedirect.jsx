import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const VendorLoginRedirect = ({children}) => {
  const {role, accessToken} = useSelector((state) => state.user);
  console.log("entered VendorLogin Redirect");

  if (accessToken && role === "vendor") {
    return <Navigate to="/vendor/" />;
  }

  if (accessToken && role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  

  return children;
};

export default VendorLoginRedirect;
