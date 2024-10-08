import React from "react";
import { Posts } from "../components";
import { Typography } from "@mui/joy";

export default function FavoritePage() {
  return (
    <>
      <Typography level="h2" textAlign="center" mb={2} fontSize="1.5rem">
        Favorite
      </Typography>
      <Posts dataSource="getFavoritePosts" />
    </>
  );
}
