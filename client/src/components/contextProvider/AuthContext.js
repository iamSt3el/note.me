import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config/config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configure axios defaults
  useEffect(() => {
    // Set up axios interceptor to add token to all requests
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      // Send request with Authorization header
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        // Clear invalid token
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear invalid token
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.error || "An error occurred during registration" 
      };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      
      setUser({
        id: response.data.id,
        username: response.data.username
      });
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.error || "An error occurred during login" 
      };
    }
  };

  const logout = async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);