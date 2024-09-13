import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

export default ({}) => {
  const [text, setText] = useState("");

  const handleChatSubmit = () => {
    if (!text) return;
    if (!Meteor.user()) {
      console.error("Login Required");
      return;
    }
    Meteor.callAsync("sendChatAsync", text).then(
      () => setText(""),
      (err) => console.error(err)
    );
  };

  return (
    <Input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Say something..."
      endDecorator={
        <Button disabled={!text} onClick={handleChatSubmit}>
          Send
        </Button>
      }
    />
  );
};
