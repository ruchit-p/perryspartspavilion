import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminOnly = ({ children }) => {
  const { dbUser } = useAuth();
  const userRole = dbUser.role;

  if (userRole !== "admin" && userRole !== "superadmin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminOnly;
