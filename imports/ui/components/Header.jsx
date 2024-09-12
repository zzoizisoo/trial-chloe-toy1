import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import { Box, Button, Typography } from "@mui/joy";
import { AppBar, Toolbar } from "@mui/material";

import ProfileImg from "./ProfileImg";

export default () => {
  const user = useTracker(() => Meteor.user());

  return (
    <AppBar position="static">
      <Toolbar>
        {user && (
          <div>
            <Button
              variant="outlined"
              sx={{ color: "white" }}
              onClick={() => FlowRouter.go("post-write")}
            >
              Blog Write
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "white", ml: 1 }}
              onClick={() => FlowRouter.go(`/favorite/${user._id}`)}
            >
              Favorite
            </Button>
          </div>
        )}

        <Typography
          level="h1"
          sx={{ flexGrow: 1, textAlign: "center", color: "white", fontSize:'1.5rem' }}
          onClick={() => FlowRouter.go("index")}
        >
          [Chloe] Toy Project
        </Typography>

        <div>
          {user ? (
            <Box
              sx={{display: 'flex'}}
              onClick={() => FlowRouter.go(`/profile/${user._id}`)}
            >
              <Typography sx={{alignSelf: 'center', mr: 1}} color="inherit">{user.profile?.name}</Typography>
              <ProfileImg src={user.profile?.profileImgUrl} />
            </Box>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ color: "white" }}
                onClick={() => FlowRouter.go("login")}
              >
                LOG IN
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white", ml: 1 }}
                onClick={() => FlowRouter.go("signup")}
              >
                SIGN UP
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
