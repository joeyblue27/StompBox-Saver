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
  const [visiblePedal, setVisiblePedal] = useState(""); // State to manage the visible pedal

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
    <Container>
      

      {/* Flex container for dropdown and image */}
      <Box display='flex' >
   
      <Box color='orange'>
        <KnobSetting />
      </Box>
      <Box color='orange'>
        <StoreSettings />
      </Box>

        {/* Dropdown menu */}
        <div className="dropdown">
          <button className="dropbtn">
            Pedals
          </button>
        
          <div id="myDropdown" className="dropdown-content">
            
           
          {filterDropdown}
          
           
            <button onClick={() => handlePedalClick("chorus")}>CHORUS</button>
            <button onClick={() => handlePedalClick("schorus")} style={{ whiteSpace: 'nowrap' }}>SUPER CHORUS</button>
            <button onClick={() => handlePedalClick("distortion")}>DISTORTION</button>
            <button onClick={() => handlePedalClick("equalizer")}>EQUALIZER</button>
            <button onClick={() => handlePedalClick("metaldist")}>METALDIST</button>
            <button onClick={() => handlePedalClick("overdrive")}>OVERDRIVE</button>
          </div>
        </div>

      
        {/* Conditionally render the visible pedal image */}
        <Box>
          {visiblePedal === "chorus" && <img src={Chorus} alt="Chorus Pedal" style={{ maxWidth: '500px', height: '500px' }} />}
          {visiblePedal === "distortion" && <img src={Distortion} alt="Distortion Pedal" style={{ maxWidth: '500px', height: '500px' }} />}
          {visiblePedal === "equalizer" && <img src={Equalizer} alt="Equalizer Pedal" style={{ maxWidth: '500px', height: '500px' }} />}
          {visiblePedal === "metaldist" && <img src={Metaldist} alt="Metaldist Pedal" style={{ maxWidth: '500px', height: '500px' }} />}
          {visiblePedal === "overdrive" && <img src={Overdrive} alt="Overdive Pedal" style={{ maxWidth: '500px', height: '500px' }} />}
          {visiblePedal === "schorus" && <img src={Schorus} alt="S-Chorus Pedal" style={{ maxWidth: '500px', height: '500px' }} />}
        </Box>
      </Box>
    </Container>
  );
};

export default Preset;