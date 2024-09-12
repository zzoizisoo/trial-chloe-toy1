import { Avatar } from "@mui/joy";
import React from "react";

export default ({ src, size, sx }) => {
  if (src) {
    return <Avatar size={size || "lg"} src={src} sx={sx} />;
  } else
    return (
      <Avatar size={size || "lg"} color="primary" variant="solid" sx={sx} />
    );
};
