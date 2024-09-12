import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Button, Typography, useTheme } from "@mui/joy";
import { FlexBox, InputProfileInfo } from "../components";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";

export default () => {
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    Meteor.loginWithPassword(formJson.username, formJson.password, (err) => {
      if (err) console.error(err);
      else FlowRouter.go("/");
    });
  };

  return (
    <>
      <Typography level="h2" textAlign="center" mb={4} mt={6} fontSize="1.5rem">
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <InputProfileInfo
          formDisplayLabel="Name or Email"
          name="username"
          type="text"
          icon={<FaUser color={theme.palette.primary[500]} />}
          required
        />

        <InputProfileInfo
          formDisplayLabel="Password"
          name="password"
          type="password"
          icon={<MdLock color={theme.palette.primary[500]} />}
          required
        />

        <FlexBox justify="center" style={{ marginTop: 50 }}>
          <Button
            sx={{ width: "6rem", mr: 1 }}
            variant="outlined"
            onClick={() => FlowRouter.go("/")}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: "6rem", mr: 1 }}
            type="submit"
            // disabled={!loginInfo.username || !loginInfo.password}
          >
            OK
          </Button>
        </FlexBox>
      </form>
    </>
  );
};
