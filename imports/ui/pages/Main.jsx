import React, { useEffect, useState } from "react";
import { UsersPanels, ChatRoom } from "../components";
import PostsList from "../components/PostsList";

export default function Main() {

  return (
    <div onScroll={() => console.log("scrolled")}>
      <div className="flex" style={{ height: 380 }}>
        <UsersPanels />
        <ChatRoom />
      </div>
      <PostsList dataSource="getPosts" />
    </div>
  );
}
