import React from "react";
import { Header } from "../components";
import { useTheme } from "@mui/joy";

export const PostsDetailLayout = ({ content }) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <main
        style={{
          marginTop: 8, //?????
          backgroundColor: theme.palette.background.level1,
        }}
      >
        {content}
      </main>
    </>
  );
};
