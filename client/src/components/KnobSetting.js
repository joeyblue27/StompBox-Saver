import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PEDALSETTING } from "../utils/mutations";
import { QUERY_PEDALSETTINGS } from "../utils/queries";
import { Box, Button, TextField } from "@mui/material";
import AuthService from "../utils/auth"; 
import { useNavigate } from "react-router-dom"; 

const KnobSetting = () => {
  const navigate = useNavigate();
  const [addpedalKnob] = useMutation(ADD_PEDALSETTING, {
    refetchQueries: [
      {
        query: QUERY_PEDALSETTINGS,
        variables: { userId: AuthService.getProfile().id },
      },
    ],
    awaitRefetchQueries: true, 
    onCompleted: () => {
      navigate("/Preset"); 
    },
  });

  
  const [formState, setFormState] = useState({
    preset: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addpedalKnob({
        variables: { ...formState, userId: AuthService.getProfile().id },
      });

      setFormState({ preset: "" });
    } catch (e) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box>

    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" right="300px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
      <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       
      />
         <TextField
        
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
 
    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" right="300px" top="140px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
      <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       
      />
         <TextField
        
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" left="250px" bottom="160px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
      <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       
      />
         <TextField
        
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" left="250px" bottom="20px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
      <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       
      />
         <TextField
        
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" left="780px" bottom="320px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
      <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       
      />
         <TextField
        
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" left="780px" bottom="180px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />
      <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       
      />
         <TextField
        
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

      
    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      width="50%"
      position="relative" right="200px" bottom="-10px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

      <Button
        type="submit"
        variant="contained"
        color="warning"
        size="small"
        mt={4}
      >
        Save
      </Button>
      
    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" left="300px" bottom="70px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

      <Button
        type="submit"
        variant="contained"
        color="warning"
        size="small"
        mt={4}
      >
        Save
      </Button>
    </Box>
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="50%"
      position="relative" left="900px" bottom="150px"
    
    >
    <TextField
        color='warning'
        name="preset"
        id="preset"
        onChange={handleChange}
        variant="outlined"
        margin="normal"
       />

      <Button
        type="submit"
        variant="contained"
        color="warning"
        size="small"
        mt={4}
      >
        Save
      </Button>
      
      
    </Box>

  </Box>
);
};


export default KnobSetting;