import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SessionManager } from './SessionManager';

export default function ProtectedRoutes() {
  const isAuthenticated = SessionManager.isAuthenticated();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
}
