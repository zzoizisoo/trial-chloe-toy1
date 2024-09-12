import React from 'react'
import { FlexBox, ProfileImg, InputFileUpload } from "../components";

export default ({ image, handleImageChange }) => {
  return (
    <FlexBox direction="column" align="center" style={{ marginBottom: 30 }}>
      <ProfileImg
        sx={{ "--Avatar-size": "80px", mb: 2 }}
        src={image ? URL.createObjectURL(image) : ""}
      />
      <InputFileUpload
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </FlexBox>
  );
};
