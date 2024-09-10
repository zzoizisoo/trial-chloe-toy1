import React, { useState } from "react";
import { UsersPanels, ChatRoom } from "../components";
import PostsList from "../components/PostsList";
import { usePagination } from "../hooks";

export default function Main() {
  const PAGINATION_SIZE = 10;
  const [pageStart, setPageStart] = useState(0);
  const posts = usePagination("getPosts", pageStart, PAGINATION_SIZE)

  const onLoadMorePosts = () => {
    setPageStart(skip + PAGINATION_SIZE);
  };

  return (
    <div>
      <div className="flex" style={{ height: 380 }}>
        <UsersPanels />
        <ChatRoom />
      </div>
      <PostsList dataSource='getPosts' />
    </div>
  );
}