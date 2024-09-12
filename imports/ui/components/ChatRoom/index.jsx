import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import ChatList from "./ChatList";
import InputArea from "./InputArea";
import FlexBox from "../FlexBox";
import { Typography, useTheme } from "@mui/joy";
import { FaExclamationCircle } from "react-icons/fa";

export default () => {
  const user = useTracker(() => Meteor.user());
  const theme = useTheme()
  return (
    <FlexBox style={{ flex: "1.5 1 0", padding: 10, backgroundColor: theme.palette.background.level1 }}>
      {user ? (
        <FlexBox direction="column" justify="flex-end" style={{ flex: 1 }}>
          <ChatList />
          <InputArea />
        </FlexBox>
      ) : (
        <Typography
          level="body-sm"
          sx={{ margin: "auto" }}
          startDecorator={<FaExclamationCircle />}
        >
          Please Login
        </Typography>
      )}
    </FlexBox>
  );
};
