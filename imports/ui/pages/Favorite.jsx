import React, { useState, useEffect } from "react";
import PostsList from "../components/PostsList";
import { useFetch, usePagination } from "../hooks";

export default function FavoritePage () {
 
  return (
    <>
      <h1>Favorite</h1>
      <PostsList dataSource='getFavoritePosts'/>
    </>
  );
};
