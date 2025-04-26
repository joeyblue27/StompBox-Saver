import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {Typography,List,ListItemSecondaryAction,ListItemText,ListItem} from "@mui/material";
import '../assets/css/homepage.css';
import AuthService from "../utils/auth";
import { QUERY_PEDALSETTINGS } from "../utils/queries";
import { DELETE_PEDALSETTING } from "../utils/mutations";

const text = {
  color: 'black'
}

const StoreSettings = () => {
  const user = AuthService.getProfile();
  const userId = user.id;

  const { loading, data, refetch } = useQuery(QUERY_PEDALSETTINGS, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
  });

  const pedalsettings = data?.pedalsettings || [];

  const navigate = useNavigate();

  const [deletepedalInfo] = useMutation(DELETE_PEDALSETTING, {
    update(cache, { data: { deletepedalInfo } }) {
      const userId = AuthService.getProfile().id;
      const data = cache.readQuery({
        query: QUERY_PEDALSETTINGS,
        variables: { userId },
      });

      if (data && data.pedalsettings) {
        const updatedPedalsettings = data.pedalsettings.filter(
          (pedalsetting) => pedalsetting._id !== deletepedalInfo._id
        );

        cache.writeQuery({
          query: QUERY_PEDALSETTINGS,
          variables: { userId },
          data: { pedalsettings: updatedPedalsettings },
        });
      }
    },
    onCompleted: () => refetch(),
    refetchQueries: [
      {
        query: QUERY_PEDALSETTINGS,
        variables: { userId },
      },
    ],
  });

  const handleClear = async (pedalsettingId) => {
    try {
      await deletepedalInfo({
        variables: { pedalsettingId, userId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (pedalsettingId) => {
    navigate(`/pedalupdates/${pedalsettingId}`);
  };

  return (
    <Typography>
    <div sx={{ margin: "0 auto" }}
    >
   
      {loading ? (
        <div sx={{ display: "flex",  marginTop: 1 }}><div/>
        </div>
      ) : (
       
        <List
        style={{
          width: '50%',
          position: 'relative',
        }}>
          
          {pedalsettings.map((pedalsetting) => (
            <ListItem key={pedalsetting._id}>
              <Link
                to={`/pedalsetting/${pedalsetting._id}`}
                style={{ textDecoration: "none" }}>
                
                <ListItemText primary={pedalsetting.preset} 
                 style={text}
                />
              </Link>
              <ListItemSecondaryAction
                   
                
              >
                
                <button id='update-btn'
                  onClick={() => handleUpdate(pedalsetting._id)}
                >
                  Update
                </button>
              
                <button id='update-btn'
                  onClick={() => handleClear(pedalsetting._id)}
                >
                  Remove
                </button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
    </Typography>
  );
};

export default StoreSettings;
