import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { useMethod } from "../../hooks";
import { Grid, Button, useTheme, Typography } from "@mui/joy";
import ProfileImg from "../ProfileImg";
import FavoriteButton from "./FavoriteButton";
import FlexBox from "../FlexBox";

export default () => {
  const postId = FlowRouter.getParam("pid");
  const post = useMethod("getPost", postId);
  const author = useMethod("getUserInfo", post?.createdBy);
  const theme = useTheme();

  return (
    <Grid
      xs={12}
      lg={6}
      sx={{
        minHeight: '100vh',
        position: "relative",
        p: 5,
        backgroundColor: theme.palette.common.white,
      }}
    >
      <div>
        {post && (
          <>
            <FavoriteButton />

            <Typography level="h2" textAlign="center" mx={5}>
              {post.title}
            </Typography>

            <Typography level="subtitle" textAlign="center" mx={5} my={2}>
              {post.description}
            </Typography>

            {post.imageUrl && (
              <img
                style={{ display: "block", width: "90%", margin: "0 auto" }}
                src={post.imageUrl}
              />
            )}

            <Typography level="body-sm" my={5}>{post.content}</Typography>

            {post.createdBy === Meteor.userId() && (
              <Button
                sx={{ display: "block", marginLeft: "auto" }}
                onClick={() => FlowRouter.go(`/post/${postId}/edit`)}
              >
                Post Edit
              </Button>
            )}
          </>
        )}

        {author && (
          <FlexBox direction="column" style={{ alignItems: 'center'}}>
            <ProfileImg src={author.profile?.profileImgUrl}/>
            <Typography level="title-lg">{author.profile?.name}</Typography>
            <Typography level="body-sm">{author.emails[0]?.address}</Typography>
          </FlexBox>
        )}
      </div>
    </Grid>
  );
};
