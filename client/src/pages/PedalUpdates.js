import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";

import KnobUpdater from "../components/KnobUpdater";
import { QUERY_PEDALSETTING } from "../utils/queries";



const PedalUpdates = () => {
  const { pedalsettingId } = useParams();
  const { data: queryData } = useQuery(QUERY_PEDALSETTING, {
    variables: { pedalsettingId },
  });

  const [pedalsetting, setPedalsetting] = useState(null);

  useEffect(() => {
    if (queryData) {
      setPedalsetting(queryData.pedalsetting);
    }
  }, [queryData]);

  if (!pedalsetting) {
    return <div variant="h6">Loading...</div>;
  }

  return (
    <Box sx={{ width: "50%", height: "80vh"}}>
      <h2>
        Update Settings
      </h2>
      <KnobUpdater pedalsettingId={pedalsettingId} pedalsetting={pedalsetting} />
    </Box>
  );
};

export default PedalUpdates;
