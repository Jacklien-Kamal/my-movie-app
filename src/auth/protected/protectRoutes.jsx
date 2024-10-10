// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth";
import JumanjiPage from "../../pages/play";

const ProtectedRoute = ({ component: JumanjiPage, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
        if (userRole !== requiredRole) {
          navigate("/unauthorized");
        }
      }
      setLoading(false);
    };
    checkRole();
  }, [navigate, requiredRole]);

  if (loading) return <div>Loading...</div>;

  return role === requiredRole ? <JumanjiPage /> : null;
};

export default ProtectedRoute;
