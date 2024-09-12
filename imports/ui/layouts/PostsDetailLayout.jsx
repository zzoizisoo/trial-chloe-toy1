import React from "react";
import { Header } from "../components";

export const PostsDetailLayout = ({ content }) => {
  return (
    <>
      <Header />
      <main>{content}</main>
    </>
  );
};
