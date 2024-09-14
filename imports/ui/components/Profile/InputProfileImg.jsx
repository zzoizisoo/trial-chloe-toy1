import React from "react";
import { Button } from "@mui/joy";
import FlexBox from "../FlexBox";
import ProfileImg from "../ProfileImg";
import InputFileUpload from "../InputFileUpload";

export default ({ src, handleImageChange, handleDeleteImage }) => {
  return (
    <FlexBox direction="column" align="center" style={{ marginBottom: 30 }}>
      <ProfileImg
        sx={{ "--Avatar-size": "80px", mb: 2 }}
        src={src ? src : ""}
      />
      <FlexBox gap={10}>
        <Button size="xs" color="danger" onClick={handleDeleteImage}>
          <span>Delete</span>
        </Button>
        <InputFileUpload
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FlexBox>
    </FlexBox>
  );
};
