import React from "react";
import { Grid, Typography } from "@mui/joy";
import { useSubscribe, useFind, useTracker } from "meteor/react-meteor-data";
import { CommentsCollection } from "../../../api/comments/collection";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

export default () => {
  const postId = FlowRouter.getParam("pid");

  // COMMENTS
  const isCommentsLoading = useSubscribe("postComments", postId);
  const comments = useFind(() => CommentsCollection.find({ postId }), [postId]);

  // PROFILES
  const commentsUids = [...new Set(comments.map((c) => c.createdBy))];
  const isUserLoading = useSubscribe("usersNicknamesProfileImgs", commentsUids);
  const userProfiles = useTracker(() => {
    return Meteor.users
      .find(
        { _id: { $in: commentsUids } },
        {
          fields: {
            "profile.profileImgUrl": 1,
            "profile.name": 1,
          },
        }
      )
      .fetch();
  });

  // Parsed Data
  const commentsWithUserProfile = comments.map((comment) => {
    const userProfile = userProfiles.find(
      (user) => user._id === comment.createdBy
    );
    return { ...comment, user: { ...userProfile } };
  });

  return (
    <Grid xs={12} lg={6}>
      <Grid
        xs={11}
        lg={8}
        sx={{ mx: "auto"}}
      >
        <Typography level="h4">Comments</Typography>
        <CommentInput />

        {!isCommentsLoading() &&
          !isUserLoading() &&
          comments &&
          userProfiles &&
          commentsWithUserProfile.map((c) => (
            <CommentItem key={c._id} comment={c} />
          ))}
      </Grid>
    </Grid>
  );
};
