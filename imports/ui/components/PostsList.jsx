import React, { useState } from "react";
import { Grid, Button } from "@mui/joy";
import { PostCard } from "../components";
import { usePagination } from "../hooks";


export default function PostList({ dataSource }) {
  const PAGINATION_COUNT = 10;
  const [pageStart, setPageStart] = useState(0);
  const posts = usePagination(dataSource, pageStart, PAGINATION_COUNT);

  const loadMorePosts = () => {
    setPageStart(pageStart + PAGINATION_COUNT);
  };

  return (
    <>
      <Grid container columns={5}>
        {posts && posts.map((p) => <PostCard key={p._id} post={p} />)}
      </Grid>

      <Button onClick={loadMorePosts}>Load More</Button>
    </>
  );
}
