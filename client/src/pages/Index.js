import React from "react";
import { Box } from "@mui/material";



const Index = () => {
  return (
     <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <div variant="h3" component="h1" color='orange' gutterBottom>
          
        </div>
  
        <div
          variant="body1"
          gutterBottom
          color='orange'
          sx={{ maxWidth: "500px", mx: "auto" }}
        >
          

          
        </div>
        
      </Box>
    </Box>
  );
};




export default Index;
