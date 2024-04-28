import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";


// set the authentication and useState

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

  
// creates the page layout

  return (
    <>

      <div>
            <h1 align="center">
              PedalBoard Saver
            </h1>
            
            <Button onClick={toggleAuthentication}
               type="submit"
               variant="contained"
               color="warning"
               size="small">
              {isAuthenticated ? "Logout" : "Login"}
              
            </Button>
            
            {!isAuthenticated && (
              <Button onClick={handleSignUp}
              type="submit"
              variant="contained"
              color="warning"
              size="small">
                Sign Up
              </Button>
            )}
      </div>
    </>
  );
};

export default HomePage;
