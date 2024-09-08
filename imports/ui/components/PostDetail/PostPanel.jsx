import React, { useState, useEffect } from "react";

import { Button } from "@mui/joy";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import ProfileImg from "../ProfileImg";
import FavoriteButton from "./FavoriteButton";
import { useFetch } from "../../hooks";

export default () => {
  const postId = FlowRouter.getParam("pid");
  const post = useFetch("getPost", postId);
  const author = useFetch("getUserInfo", post?.createdBy);

  return (
    <div style={{ position: "relative" }}>
      {post && (
        <>
          <h1>{post.title}</h1>

          <FavoriteButton />

          <p>{post.description}</p>
          {post.imageUrl && (
            <img style={{ width: "100%" }} src={post.imageUrl} />
          )}

          <p>{post.content}</p>

          {post.createdBy === Meteor.userId() && (
            <Button onClick={() => FlowRouter.go(`/post/${postId}/edit`)}>
              Post Edit
            </Button>
          )}
        </>
      )}

      {author && (
        <div>
          <ProfileImg src={author.profile?.profileImgUrl} />
          <div>{author.profile?.name}</div>
        </div>
      )}
    </div>
  );
};
