import React from "react";
import { FlexBox, Header } from "../components";

export default ({ content }) => {
  return (
    <>
      <Header />
      <main>
        <FlexBox direction="column">{content}</FlexBox>
      </main>
    </>
  );
};
