import React from "react";
import { Input, Typography } from "@mui/joy";

export default ({ formDisplayLabel, name, image }) => {
  const displayImageFileOrUrl= () => {
    if (image instanceof File) {
      return (
        <img style={{ maxWidth: "100%" }} src={URL.createObjectURL(image)} />
      );
    } else if (typeof image === "string") {
      return <img style={{ maxWidth: "100%" }} src={image} />;
    }
  };
  
  return (
    <>
      <Typography level="body-xs">{formDisplayLabel}</Typography>
      {displayImageFileOrUrl()}
      <Input
        name={name}
        type="file"
        accept="image/*"
        sx={{ alignItems: "center", marginBottom: 2 }}
      />
    </>
  );
};
