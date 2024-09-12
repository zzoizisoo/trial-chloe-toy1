import React from "react";
import { PostList } from "../components";

export default function FavoritePage() {
  return (
    <>
      <h1>Favorite</h1>
      <PostList dataSource="getFavoritePosts" />
    </>
  );
}
