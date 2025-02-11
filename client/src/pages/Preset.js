
import React, { useState } from 'react';
import { Container, Box } from "@mui/material";
import KnobSetting from "../components/KnobSetting";
import StoreSettings from "../components/StoreSettings";
import '../assets/css/preset.css';
import Chorus from '../assets/images/bpedals/chorus.png';
import Distortion from '../assets/images/bpedals/distortion.png';
import Equalizer from '../assets/images/bpedals/equalizer.png';
import Metaldist from '../assets/images/bpedals/metaldist.png';
import Overdrive from '../assets/images/bpedals/overdrive.png';
import Schorus from '../assets/images/bpedals/schorus.png';

const Preset = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [visiblePedal, setVisiblePedal] = useState(""); // State to manage the visible pedal

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

  const handlePedalClick = (pedal) => {
    // Set the visible pedal based on the clicked pedal
    setVisiblePedal(pedal);
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
              placeholder="Search..."
            />
            <a href="#" onClick={() => handlePedalClick("chorus")}>CHORUS</a>
            <a href="#" onClick={() => handlePedalClick("schorus")} style={{whiteSpace: 'nowrap'}}>SUPER CHORUS</a>
            <a href="#" onClick={() => handlePedalClick("distortion")}>DISTORTION</a>
            <a href="#" onClick={() => handlePedalClick("equalizer")}>EQUALIZER</a>
            <a href="#" onClick={() => handlePedalClick("metaldist")}>METALDIST</a>
            <a href="#" onClick={() => handlePedalClick("overdrive")}>OVERDRIVE</a>
          </div>
        )}
      </div>

      {/* Conditionally render the visible pedal image */}
      <Box mt={4}>
        {visiblePedal === "chorus" && <img src={Chorus} alt="Chorus Pedal" style={{ maxWidth: '100%', height: 'auto' }} />}
        {visiblePedal === "distortion" && <img src={Distortion} alt="Distortion Pedal" style={{ maxWidth: '100%', height: 'auto' }} />}
        {visiblePedal === "equalizer" && <img src={Equalizer} alt="Equalizer Pedal" style={{ maxWidth: '100%', height: 'auto' }} />}
        {visiblePedal === "metaldist" && <img src={Metaldist} alt="Metaldist Pedal" style={{ maxWidth: '100%', height: 'auto' }} />}
        {visiblePedal === "overdrive" && <img src={Overdrive} alt="Overdive Pedal" style={{ maxWidth: '100%', height: 'auto' }} />}
        {visiblePedal === "schorus" && <img src={Schorus} alt="S-Chorus Pedal" style={{ maxWidth: '100%', height: 'auto' }} />}
      </Box>
    </Container>
  );
};

export default Preset;
