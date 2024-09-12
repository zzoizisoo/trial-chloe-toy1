import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import ProfileImg from "../ProfileImg";
import { Box, Typography, useTheme } from "@mui/joy";
import FlexBox from "../FlexBox";
import { FaExclamationCircle } from "react-icons/fa";

export default ({ selectedUser }) => {
  const theme = useTheme()

  const user = useTracker(() => Meteor.user());
  return (
    <FlexBox direction="column" style={{ flex: "1 1 0" }}>
      <FlexBox
        direction="column"
        align="center"
        justify="center"
        style={{ flex: "1.5 1 0", backgroundColor: theme.palette.background.level1}}
      >
        <ProfileImg
          src={selectedUser.profile?.profileImgUrl}
          sx={{ "--Avatar-size": "100px", mb: 1 }}
        />
        <Typography level="title-lg">{selectedUser.profile?.name}</Typography>
      </FlexBox>

      {/* Only authenticated user available */}
      <FlexBox
        direction="column"
        justify="space-evenly"
        align="flex-start"
        style={{
          marginTop: 5,
          padding: 10,
          flex: "1 1 0",
          backgroundColor: theme.palette.background.level1
        }}
      >
        {user ? (
          <>
            <FlexBox align="center" style={{ width: "100%" }}>
              <Typography flexGrow={1} startDecorator={<FaPhone />}>
                {selectedUser.profile?.phoneNumber || "-"}
              </Typography>
              <Typography level="body-xs">phone number</Typography>
            </FlexBox>

            <FlexBox align="center" style={{ width: "100%" }}>
              <Typography flexGrow={1} startDecorator={<AiFillMail />}>
                {selectedUser.emails ? selectedUser.emails[0].address : "-"}
              </Typography>
              <Typography level="body-xs">email</Typography>
            </FlexBox>
          </>
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
    </FlexBox>
  );
};
