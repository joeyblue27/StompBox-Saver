import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PEDALSETTING } from "../utils/mutations";
import { QUERY_PEDALSETTINGS } from "../utils/queries";
import { Box, Button, TextField } from "@mui/material";
import AuthService from "../utils/auth"; 
import { useNavigate } from "react-router-dom"; 

// mutations with navigation

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

  // Form states added
  
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

// Box Form layouts with Save buttons

  return (
    

    

    
   
    <Box
      
      component="form"
      onSubmit={handleFormSubmit}
      display="flex"
      flexDirection="row"
      alignItems=""
      width="100%"
      position="relative" left="1000px"
    
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

  
);
};


export default KnobSetting;