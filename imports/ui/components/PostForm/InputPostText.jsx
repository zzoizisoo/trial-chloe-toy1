import React from 'react'
import { Input, Typography } from "@mui/joy";

export default ({ name, type , defaultValue, formDisplayLabel }) => {

  return (
    <div style={{marginBottom: 20}}>
      <Typography level='body-xs' sx={{mb:1}}>{formDisplayLabel}</Typography>
      <Input
        variant="outlined"
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder='Type Something...'
      />
    </div>
  );
};
