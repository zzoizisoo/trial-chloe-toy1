import React, { useEffect, useState } from "react";
import { UsersPanels, ChatRoom } from "../components";
import PostsList from "../components/PostsList";
import { Box, Grid } from "@mui/joy";

export default function Main() {
  return (
    <>
      <div style={{display: "flex", height: 380}}>
          <UsersPanels />
          <ChatRoom />
      </div>
      <PostsList dataSource="getPosts" />
    </>
  );
}
