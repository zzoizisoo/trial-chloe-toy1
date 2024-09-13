import { Mongo } from "meteor/mongo";
import { Button, Input, Typography, Box } from "@mui/joy";
import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { UploadObject } from "../../../s3";
import { v4 as uuidv4 } from "uuid";
import { useMethod } from "../hooks";
import { FlexBox, InputPostText } from "../components";
import InputPostTextarea from "../components/InputPostTextarea";

export default ({ postId }) => {
  // if no postId -> creating new post
  // else -> editing post
  // onsubmit -> upsert post
  const post = useMethod("getPost", postId);
  const [newImage, setNewImage] = useState(undefined);

  const defaultValues = post
    ? {
        title: post.title,
        description: post.description,
        content: post.content,
      }
    : {
        title: "",
        description: "",
        content: "",
      };

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "imageUrl":
        setNewImage(target.files[0]);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Meteor.user()) return;
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // TODOS:restrict image resolution, size

    let newPost = {};

    Object.entries(defaultValues).forEach(([key]) => {
      if (!formJson[key]) return;
      if (formJson[key] === defaultValues[key]) return;
      newPost[key] = formJson[key];
    });

    if (post) {
      newPost._id = postId;
    }

    if (newImage) {
      try {
        const fileId = uuidv4();
        const url = await UploadObject(`postImg/${fileId}.png`, newImage);
        newPost.imageUrl = url;
      } catch (e) {
        console.error(e);
      }
    }

    const res = await Meteor.callAsync("upsertPost", newPost);
    FlowRouter.go(`/post/${postId || res.insertedId}`);
  };

  return (
    <Box sx={{width: 800, mx: 'auto', mt: 3}}>
      <form onSubmit={handleSubmit} onChange={handleFormChange}>

        {/* TODO: Default values are not passed 🤔 */}
        <InputPostText
          name="title"
          formDisplayLabel="Title"
          defaultValue={defaultValues.title}
        />
       
        <InputPostText
          name="description"
          formDisplayLabel="Description"
          defaultValue={defaultValues.description}
        />

        <Typography level="body-xs"> Image</Typography>
        {newImage ? (
          <img
            style={{ maxWidth: "100%" }}
            src={URL.createObjectURL(newImage)}
          />
        ) : post ? (
          <img style={{ maxWidth: "100%" }} src={post.imageUrl} />
        ) : (
          <></>
        )}
        <Input
          name="imageUrl"
          type="file"
          accept="image/*"
          sx={{ alignItems: "center", marginBottom: 2 }}
        />

        <InputPostTextarea
          formDisplayLabel="Content"
          name="content"
          defaultValue={defaultValues.content}
        />

        <FlexBox gap={10} justify="center" style={{marginTop: 50}}> 
          <Button type="button" variant="outlined"> Cancel </Button>
          <Button type="submit"> Save </Button>
        </FlexBox>
      </form>
    </Box>
  );
};
