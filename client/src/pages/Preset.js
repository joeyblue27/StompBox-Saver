import React, { useState } from 'react';
import { Container, Box } from "@mui/material";
import KnobSetting from "../components/KnobSetting";
import StoreSettings from "../components/StoreSettings";
import '../assets/css/preset.css';


const Preset = () => {
  const [setVisiblePedal] = useState(""); // State to manage the visible pedal

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

  return (<></>
    
  );
};

export default Preset;