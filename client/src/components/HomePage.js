import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";
import '../assets/css/homepage.css';
import { Box, Container } from '@mui/material';
import KnobSetting from './KnobSetting';  // Adjust this import if it's a real component
import StoreSettings from './StoreSettings';  // Adjust this import if it's a real component
import Chorus from '../assets/images/bpedals/chorus.png';
import Distortion from '../assets/images/bpedals/distortion.png';
import Equalizer from '../assets/images/bpedals/equalizer.png';
import Distortion2 from '../assets/images/bpedals/distortion2.png';
import Overdrive from '../assets/images/bpedals/overdrive.png';
import Schorus from '../assets/images/bpedals/schorus.png';

// set the authentication and useState
const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visiblePedal, setVisiblePedal] = useState(""); // State to manage the visible pedal
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

  const handlePedalClick = (pedal) => {
    // Set the visible pedal based on the clicked pedal
    setVisiblePedal(pedal);
  };

  const filterDropdown = (event) => {
    const input = event.target.value.toUpperCase();
    const dropdownItems = document.querySelectorAll("#myDropdown a");
    dropdownItems.forEach(item => {
      const text = item.textContent || item.innerText;
      if (text.toUpperCase().includes(input)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  };

  return (
    <div>
      <h1 align="center">Pedal Saver</h1>

      {/* Authentication Buttons */}
      <Box display="flex" justifyContent='space-between'>
      <Button id="signup" onClick={toggleAuthentication} type="submit"  >
        {isAuthenticated ? "Logout" : "Login"}
      </Button>

      {!isAuthenticated && (
        <Button id="signup" onClick={handleSignUp} type="submit"  >
          Sign Up
        </Button>
       )}
       </Box>

      {/* Dropdown menu*/}
      <Container>
        <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
          <div className="dropdown">
            <button className="dropbtn">
              Pedals
            </button>
            <div id="myDropdown" className="dropdown-content">
              {filterDropdown}
              <button onClick={() => handlePedalClick("chorus")}>CHORUS</button>
              <button onClick={() => handlePedalClick("schorus")} style={{ whiteSpace: 'nowrap' }}>SUPER CHORUS</button>
              <button onClick={() => handlePedalClick("distortion")}>DISTORTION</button>
              <button onClick={() => handlePedalClick("distortion2")}>DISTORTION2</button>
              <button onClick={() => handlePedalClick("equalizer")}>EQUALIZER</button>
              <button onClick={() => handlePedalClick("overdrive")}>OVERDRIVE</button>
            </div>
          </div>
        </Box>

        {/* Conditionally render the visible pedal image */}
        {visiblePedal && (
          <Box>
            {visiblePedal === "chorus" && <img src={Chorus} alt="Chorus Pedal" style={{ maxWidth: '300px', height: '300px' }} />}
            {visiblePedal === "distortion" && <img src={Distortion} alt="Distortion Pedal" style={{ maxWidth: '300px', height: '300px' }} />}
            {visiblePedal === "equalizer" && <img src={Equalizer} alt="Equalizer Pedal" style={{ maxWidth: '300px', height: '300px' }} />}
            {visiblePedal === "distortion2" && <img src={Distortion2} alt="Distortion2 Pedal" style={{ maxWidth: '300px', height: '300px' }} />}
            {visiblePedal === "overdrive" && <img src={Overdrive} alt="Overdrive Pedal" style={{ maxWidth: '300px', height: '300px' }} />}
            {visiblePedal === "schorus" && <img src={Schorus} alt="S-Chorus Pedal" style={{ maxWidth: '300px', height: '300px' }} />}
          </Box>
          
        )}
        
        
        {isAuthenticated && (
          <div>
          <Box color="orange">
              <KnobSetting />
            </Box>
            <Box color="orange">
              <StoreSettings />
            </Box>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
