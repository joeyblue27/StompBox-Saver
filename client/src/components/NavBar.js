import React from "react";
import { Link } from "react-router-dom";
import {Button, Tab} from "@mui/material";

const NavBar = () => {
  return (
    <div sx={{ flexGrow: 1 }}>
      <Button value={false} indicatorColor="orange" textColor="orange">
 
        <Tab
        indicatorColor="orange"
          label="Presets"
          component={Link}
          to="/Preset"
        />
      </Button>
    </div>
  );
};

export default NavBar;
