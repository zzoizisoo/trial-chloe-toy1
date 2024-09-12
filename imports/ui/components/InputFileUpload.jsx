import React from "react";
import { Button, styled, Typography } from "@mui/joy";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload({ onChange }) {
  return (
    <Button
      size="sm"
      component="label"
      tabIndex={-1}
      color="primary"
      sx={{
        width: '80px',
      }}
    >
      <Typography color="white" fontSize={10}>Upload</Typography>
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
}
