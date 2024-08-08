import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const RedirectAuthenticated = ({children}) => {
  const user = useSelector((state) => state.user);

  console.log("entered in redirect authenticated");

  if (user.accessToken) {
    const redirectPath =
      user.role === "admin"
        ? "/admin/dashboard"
        : user.role === "vendor"
        ? "/vendor/"
        : "/";
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default RedirectAuthenticated;
