import React from "react";
import ProfileImg from "../ProfileImg";
import FlexBox from "../FlexBox";
import { Typography, Box, useTheme } from "@mui/joy";

export default ({ user, chat }) => {
  const date = new Date(chat.createdAt);
  const isMine = chat.createdBy === user._id;
  const theme = useTheme();

  const style = isMine
    ? {
        row: {
          marginTop: "1.5rem",
          alignSelf: "flex-end",
        },
        box: {
          padding: 1,
          marginRight: 1,
          position: "relative",
          backgroundColor: theme.palette.common.white,
        },
        arrow: {
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `5px solid ${theme.palette.common.white}`,
          position: "absolute",
          top: 10,
          right: -5,
        },
        typo: {
          color: theme.vars.palette.common.black,
        },
      }
    : {
        row: {
          marginTop: "1.5rem",
          alignSelf: "flex-start",
        },
        box: {
          padding: 1,
          marginLeft: 1,
          position: "relative",
          backgroundColor: theme.palette.primary[500],
        },
        arrow: {
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderRight: `5px solid ${theme.palette.primary[500]}`,
          position: "absolute",
          top: 10,
          left: -5,
        },
        typo: {
          color: theme.vars.palette.common.white,
        },
      };

  return (
    <FlexBox
      gap={8}
      direction={isMine ? "row-reverse" : "row"}
      style={style.row}
    >
      <Box>
        <ProfileImg size="sm" src={chat.profileImgUrl} />
      </Box>
      <Box sx={style.box}>
        <Typography level="body-sm" sx={style.typo}>
          {chat.content}
        </Typography>
        <div style={style.arrow} />
      </Box>
      <Typography component="p" alignSelf="flex-end" level="body-xs" sx={{flexGrow:1, textWrap: 'nowrap'}}>
        {`${date.toLocaleString("ko-kr")}`}
      </Typography>
    </FlexBox>
  );
};
