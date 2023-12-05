import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "./logout.style";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return <LogoutButton onClick={handleLogout}>Logout </LogoutButton>;
};

export default Logout;
