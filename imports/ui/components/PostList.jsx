import React, { useState } from "react";
import { Grid, Button } from "@mui/joy";
import { PostCard } from ".";
import { useMethodPagination } from "../hooks";

export default ({ dataSource }) => {
  const PAGINATION_COUNT = 100;
  const [pageStart, setPageStart] = useState(0);
  const posts = useMethodPagination(dataSource, pageStart, PAGINATION_COUNT);

  const loadMorePosts = () => {
    // 다음 페이지를 불러올 때 doc의 추가가 있는 경우 중첩 데이터가 중복으로 오는 문제가 있다.
    setPageStart(pageStart + PAGINATION_COUNT);
  };

  return (
    <div>
      <Grid container columns={5} spacing={2}>
        {posts && posts.map((p) => <PostCard key={p._id} post={p} />)}
      </Grid>

    {/* TODO?  */}
    {/* 전체 다 불러왔음 사실 없어도 되긴함 */}
      <Button onClick={loadMorePosts} 
      variant="plain"
      sx={{ display: "block", mx: "auto", my:4}}>
        Load More
      </Button>
    </div>
  );
};
