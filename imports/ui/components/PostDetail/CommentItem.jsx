import React from "react";
import ProfileImg from "../ProfileImg";
import FlexBox from "../FlexBox";
import { Typography, useTheme } from "@mui/joy";
import moment from "moment";

export default ({ comment }) => {
  const theme = useTheme();

  return (
    <FlexBox
      gap={15}
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: theme.palette.common.white,
      }}
    >
      <div>
        <ProfileImg src={comment.user.profile.profileImgUrl} size="sm"/>
      </div>
      <div>
        <FlexBox gap={20}>
          <Typography fontWeight="lg">{comment.user.profile.name}</Typography>
          <Typography level="body-xs" alignSelf={'flex-end'}>{moment(comment.createdAt).fromNow()}</Typography>
        </FlexBox>
        <div style={{marginTop: 10}}>{comment.content}</div>
      </div>
    </FlexBox>
  );
};
 