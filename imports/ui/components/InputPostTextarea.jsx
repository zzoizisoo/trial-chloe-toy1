import React from 'react'

import { Input, Textarea, Typography } from "@mui/joy";

export default ({ name, defaultValue, placeholder, formDisplayLabel }) => {
  return (
    <div style={{marginTop: 30}}>
      <Typography level='body-xs' sx={{mb:1}}>{formDisplayLabel}</Typography>
      <Textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        sx={{minHeight: 200}}
      />
    </div>
  );
};
