import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../components/contextProvider/AuthContext";
import Loader from "../../components/shared/loader";

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  if (loading || isLoading) {
    return <Loader/>;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
