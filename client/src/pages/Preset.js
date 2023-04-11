import React from "react";
import { Container, Box } from "@mui/material";
import KnobSetting from "../components/KnobSetting";
import StoreSettings from "../components/StoreSettings";

const Preset = () => {
  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <div variant="h3" component="h1" color='orange' gutterBottom>
       
      </div>
      <Box color='orange' mt={4}>
        <KnobSetting />
      </Box>
      <Box color='orange' mt={4}>
        <StoreSettings />
      </Box>
    </Container>
  );
};

export default Preset;
