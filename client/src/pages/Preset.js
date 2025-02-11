import React, { useState } from 'react';
import { Container, Box } from "@mui/material";
import KnobSetting from "../components/KnobSetting";
import StoreSettings from "../components/StoreSettings";
import '../assets/css/preset.css';
import '../assets/css/preset.css';


const Preset = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
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
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <div variant="h3" component="h1" color='orange' gutterBottom>
        {/* Placeholder for header or title */}
      </div>
      <Box color='orange' mt={4}>
        <KnobSetting />
      </Box>
      <Box color='orange' mt={4}>
        <StoreSettings />
      </Box>

      {/* Dropdown menu */}
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          Pedals
        </button>
        {isDropdownOpen && (
          <div id="myDropdown" className="dropdown-content">
            <input
              type="text"
              id="myInput"
              onKeyUp={filterDropdown}
              placeholder="Search for options..."
            />
            <a href="#about">CHORUS</a>
            
            <a href="#base">DISTORTION</a>
            <a href="#blog">EQUALIZER</a>
            <a href="#contact">METALDIST</a>
            <a href="#custom">OVERDRIVE</a>
            <a href="#support">S.CHORUS</a>
            
          </div>
        )}
      </div>
    </Container>
  );
};

export default Preset;