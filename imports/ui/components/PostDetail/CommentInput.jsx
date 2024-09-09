import { Button } from "@mui/joy";
import React, { useState } from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

export default () => {
  const postId = FlowRouter.getParam("pid");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!Meteor.user()) return;
    if (!content) return;

    await Meteor.callAsync("addComment", {
      postId,
      content,
    });
    setContent("");
  };

  return (
    <div>
      <textarea value={content} onChange={handleChange} />
      <Button onClick={handleSubmitComment}>Add Comment</Button>
    </div>
  );
};
