import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PEDALSETTING } from "../utils/mutations";
import { QUERY_PEDALSETTING, QUERY_PEDALSETTINGS } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import AuthService from "../utils/auth";

const KnobUpdater = ({ pedalsettingId, pedalsetting }) => {
  const navigate = useNavigate();
  const [isWinpromptOpen, setIsWinpromptOpen] = useState(false);
  const [setWinpromptText] = useState("");

  const [preset, setUpdate] = useState(pedalsetting.preset);
  const [knobs, setKnobs] = useState(
    pedalsetting.knobs.map((knob) => ({
      ...knob,
      conditionValue: knob.conditionValue || [],
    }))
  );

  const openWinprompt = (text) => {
    setWinpromptText(text);
    setIsWinpromptOpen(true);
  };

  const [updatepedalKnob, { loading, error }] =
    useMutation(UPDATE_PEDALSETTING);

  const handleUpdate = (e) => {
    setUpdate(e.target.value);
  };
  const handleKnobs = (e, index) => {
    const newKnobs = [...knobs];

    if (e.target.name) {
      newKnobs[index] = {
        ...newKnobs[index],
        conditionValue: e.target.value,
      };
    } else {
      newKnobs[index] = {
        ...newKnobs[index],
        [e.target.name]: e.target.value,
        position: index + 1,
      };
    }

    setKnobs(newKnobs);
  };

  const validateCondition = (knobs) => {
    for (const knob of knobs) {
      const { presetType, presetValue } = knob;

      if (
        (presetType || presetType ) &&
        presetValue.length !== 1
      ) {
        openWinprompt();
        return false;
      }

      if (
        (presetType || presetType) &&
        presetValue.length !== 2
      ) {
        openWinprompt();
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCondition(knobs)) {
      return;
    }

    try {
    
      const clearKnobs = knobs.map(({ __typename, ...knob }, index) => ({
        ...knob,
        position: index + 1,
      }));

      const user = AuthService.getProfile();
      const userId = user.id;

      await updatepedalKnob({
        variables: { pedalsettingId, preset, knobs: clearKnobs, userId },
        refetchQueries: [
          { query: QUERY_PEDALSETTINGS },
          { query: QUERY_PEDALSETTING, variables: { pedalsettingId } },
        ],
      });
      setUpdate("");
      setKnobs([]);

     
      navigate("/Preset");
      
    } catch (err) {
      console.error("mutation error", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pedalsetting">
      <form onSubmit={handleSubmit}>
        <div container spacing={2}>
          <div item xs={12}>
            <Box sx={{ mb: 2 }}>
             
              <TextField
                id="preset"
                name="preset"
                value={preset}
                onChange={handleUpdate}
                fullWidth
              />
            </Box>
          </div>
          {knobs.map((knob, index) => (
            <div item xs={12} key={index}>
              <Box sx={{ mb: 2 }}>
              
                <TextField
                  id={`text-${index}`}
            
                  name="text"
                  value={knob.text || ""}
                  onChange={(e) => handleKnobs(e, index)}
                  fullWidth
                />
              </Box>
            </div>
          ))}
          <div item xs={12}>
            <div
              style={{
                display: "inline-flex",      
              }}
            >
   
              <Button
                variant="contained"
                color="warning"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div open={isWinpromptOpen} onClose={() => setIsWinpromptOpen(false)}>
        <Box sx={{ p: 2 }}>
     
        </Box>
        <Box sx={{ p: 2 }}>
          <Button onClick={() => setIsWinpromptOpen(false)}>Close</Button>
        </Box>
      </div>
    </div>
  );
};

export default KnobUpdater;
