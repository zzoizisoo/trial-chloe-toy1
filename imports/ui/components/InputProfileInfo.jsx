import React from "react";
import { Typography, Input, useTheme } from "@mui/joy";
import { FlexBox } from "../components";

import { FaExclamationCircle } from "react-icons/fa";

export default ({ formDisplayLabel, name, type, icon, required, error }) => {
  const theme = useTheme();

  const styles = {
    formLabel: {
      textAlign: "right",
      width: "10em",
      alignContent: "center",
      mr: 4,
      color: theme.palette.primary[500],
    },
    formRow: {
      marginBottom: "1em",
      marginRight: "5em",
      alignItems: "center",
    },
    error: {
      width: 0,
      marginLeft: 1,
      textWrap: "nowrap",
      color: theme.palette.primary[500],
    },
  };

  return (
    <FlexBox style={styles.formRow}>
      <Typography level="body-sm" sx={styles.formLabel}>
        {formDisplayLabel}
      </Typography>
      <Input
        color="primary"
        variant="outlined"
        name={name}
        type={type}
        sx={{ width: 300, "--Input-radius": "50px" }}
        endDecorator={icon}
        required={required ? true : false}
      />
      {error && (
        <Typography
          component="div"
          startDecorator={<FaExclamationCircle />}
          level="body-xs"
          sx={styles.error}
        >
          {error}
        </Typography>
      )}
    </FlexBox>
  );
};
