import React, { useState } from "react";
import { Grid, Button } from "@mui/joy";
import { PostCard } from "../components";
import { usePagination } from "../hooks";

export default function PostList({ dataSource }) {
  const PAGINATION_COUNT = 100;
  const [pageStart, setPageStart] = useState(0);
  const posts = usePagination(dataSource, pageStart, PAGINATION_COUNT);

  const loadMorePosts = () => {
    // 다음 페이지를 불러올 때 doc의 추가가 있는 경우 중첩 데이터가 중복으로 오는 문제가 있다.
    setPageStart(pageStart + PAGINATION_COUNT);
  };

  return (
    <div>
      <Grid container columns={5}>
        {posts && posts.map((p) => <PostCard key={p._id} post={p} />)}
      </Grid>

      <Button onClick={loadMorePosts}>Load More</Button>
    </div>
  );
}
