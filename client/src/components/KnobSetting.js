import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PEDALSETTING } from "../utils/mutations";
import { QUERY_PEDALSETTINGS } from "../utils/queries";
import { Box, TextField } from "@mui/material";
import AuthService from "../utils/auth"; 
import { useNavigate } from "react-router-dom"; 
import '../assets/css/homepage.css';

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
      navigate("/PedalUpdates"); 
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
    >
    <TextField
        name="preset"
        className="preset"
        onChange={handleChange}
        variant="outlined"
       />

      <button className="save-btn">
        Save
      </button>
    </Box>

  
);
};


export default KnobSetting;