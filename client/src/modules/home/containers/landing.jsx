import React, { useEffect, useState } from "react";
import { isUserLoggedIn } from "Utils/common";
import { Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LockIcon from "@material-ui/icons/Lock";
import socket from "Utils/socket";
import Snackbar from "Components/snackbar";
import Text from "CommonComponents/text";

const landing = () => {
  useEffect(() => {
    if (isUserLoggedIn()) {
      socket.emit("userConnected", { token: isUserLoggedIn() });
      socket.on("welcomeMessage", (data) => {
        setSocketMessage(data.message);
      });
    }
  }, []);

  const [socketMessage, setSocketMessage] = useState("");

  if (isUserLoggedIn()) {
    return (
      <>
        {socketMessage && (
          <Snackbar
            variant="success"
            message={socketMessage}
            handleClose={() => {
              setSocketMessage("");
            }}
          />
        )}
        <Grid container direction="column" justify="center" alignItems="center">
          <HomeIcon fontSize="large" style={{ fontSize: "124px", marginTop: "25%", color: "white" }} />
          <Text>hello</Text>
        </Grid>
      </>
    );
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <LockIcon style={{ fontSize: "124px", marginTop: "25%", color: "white" }} />
      <Text>hello</Text>
    </Grid>
  );
};

export default landing;
