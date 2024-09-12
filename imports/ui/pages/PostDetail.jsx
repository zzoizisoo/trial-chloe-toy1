import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/joy";
import { PostPanel, CommentsPanel } from "../components";

export default ({ postId }) => {
  useEffect(() => {
    if (Meteor.user()) {
      Meteor.callAsync("increaseViewCount", postId);
    }
  }, [postId, Meteor.user()]);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <PostPanel />
      <CommentsPanel />
    </Grid>
  );
};
