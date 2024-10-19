// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div>Loading...</div>; // Optional loading state

  if (!user || !isAdmin) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated or not an admin
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
