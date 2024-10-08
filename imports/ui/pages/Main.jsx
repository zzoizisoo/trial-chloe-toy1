import React from "react";
import { UsersPanels, ChatRoom, FlexBox } from "../components";
import { Posts } from "../components";

export default function Main() {
  return (
    <>
      <FlexBox style={{height: 340, gap: 10, marginBottom: 20}}>
          <UsersPanels />
          <ChatRoom />
      </FlexBox>
      <Posts dataSource="getPosts" />
    </>
  );
}
