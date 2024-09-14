import React from "react";
import { Button } from "@mui/joy";
import FlexBox from "../FlexBox";
import ProfileImg from "../ProfileImg";
import InputFileUpload from "../InputFileUpload";

export default ({ image, handleChangeImage, handleDeleteImage }) => {
  const imgStyles = { "--Avatar-size": "80px", mb: 2 };
  const displayImageFileOrUrl = () => {
    if (!image) {
      return <ProfileImg sx={imgStyles} />;
    } else if (image instanceof File) {
      return <ProfileImg sx={imgStyles} src={URL.createObjectURL(image)} />;
    } else if (typeof image === "string") {
      return <ProfileImg sx={imgStyles} src={image} />;
    }
  };
  return (
    <FlexBox direction="column" align="center" style={{ marginBottom: 30 }}>
      {displayImageFileOrUrl()}
      <FlexBox gap={10}>
        <Button size="xs" color="danger" onClick={handleDeleteImage}>
          <span>Delete</span>
        </Button>
        <InputFileUpload
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </FlexBox>
    </FlexBox>
  );
};
