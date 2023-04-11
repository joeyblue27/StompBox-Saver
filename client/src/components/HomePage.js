import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const toggleAuthentication = () => {
    if (isAuthenticated) {
      AuthService.logout();
    } else {
      navigate("/login");
    }
  };

  const checkAuthStatus = () => {
    const loggedIn = AuthService.loggedIn();
    setIsAuthenticated(loggedIn);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <>

      <div>
            <h1 align="center">
              Guitar Rig Saver
            </h1>
            
            <Button onClick={toggleAuthentication}>
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
            
            {!isAuthenticated && (
              <Button onClick={handleSignUp}>
                Sign Up
              </Button>
            )}
      </div>
    </>
  );
};

export default HomePage;
