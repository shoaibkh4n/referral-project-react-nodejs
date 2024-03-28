import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("token");

  if (user) {
    const expTime = JSON.parse(window.atob(user.split(".")[1])).exp;
    if (Date.now() / 1000 <= expTime) {
      return true;
    }
  } else {
    localStorage.clear();
    return false;
  }
};

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/Authentication/login" />;
};

export default ProtectedRoutes;
