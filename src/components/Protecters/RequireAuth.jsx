import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoginRequireModal from "../Protecters/LoginRequireModal";

const RequireAuth = ({children}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  if (!user || !user.accessToken) {
    return <LoginRequireModal onClose={handleClose} />;
  }

  return children;
};

export default RequireAuth;
