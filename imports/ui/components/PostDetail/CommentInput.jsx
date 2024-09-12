import { Button, Textarea } from "@mui/joy";
import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";




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
      <div>
        <Textarea color="neutral" variant="outlined" value={content} minRows={3} onChange={handleChange} sx={
          {marginBottom: 1}
        } placeholder="Write a Response..."/>
      </div>
      <Button sx={{display: 'block', ml: 'auto'}} onClick={handleSubmitComment}>Add Comment</Button>
    </div>
  );
};
