import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";



import { QUERY_PEDALSETTING } from "../utils/queries";





const PedalKnob = () => {
  const { pedalsettingId } = useParams();

  const { loading, data } = useQuery(QUERY_PEDALSETTING, {
    variables: { pedalsettingId: pedalsettingId },
    refetchQueries: [{ query: QUERY_PEDALSETTING, variables: { pedalsettingId } }],
  });

  const pedalsetting = data?.pedalsetting || [];
  return (
    <Box sx={{ mt: 5 }}>
      <div>
        <div variant="h3" gutterBottom
        
        >
          Presets
        </div>
        {loading ? (
          <div />
        ) : (
          <div
            pedalsettingId={pedalsetting._id}
            preset={pedalsetting.preset}
            knobs={pedalsetting.knobs}
          />
        )}
      </div>
    </Box>
  );
};

export default PedalKnob;
