import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoginRequireModal from "../Protecters/LoginRequireModal";

const RequireAuth = ({children}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user || !user.accessToken) {
    return <LoginRequireModal onClose={() => navigate("/")} />;
  }

  return children;
};

export default RequireAuth;
