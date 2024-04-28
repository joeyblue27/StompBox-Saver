import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {Typography,Button,List,ListItemSecondaryAction,ListItemText,ListItem} from "@mui/material";

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
      <div variant="h4" component="h2" gutterBottom>
      
        
      </div>
      {loading ? (
        <div sx={{ display: "flex",  marginTop: 2 }}><div/>
        </div>
      ) : (
       
        <List
        style={{
          
          width: '100%',
          position: 'relative',
          left: '105%', 
          
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
                
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  
                  onClick={() => handleUpdate(pedalsetting._id)}
                  
                  
                >
                  Update
                </Button>
              
                <Button
                 variant="contained"
                 color="error"
                 type="submit"
                 style={{float: 'right'}}
                  onClick={() => handleClear(pedalsetting._id)}
                >
                  Clear
                </Button>
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
