import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Button, Typography, Input, useTheme } from "@mui/joy";
import { FlexBox, InputProfileImg, InputProfileInfo } from "../components";
import { v4 as uuidv4 } from "uuid";
import { UploadObject } from "../../../s3";
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";

export default () => {
  const [newProfileImg, setNewProfileImg] = useState(null);
  const theme = useTheme();
  const handleImageChange = (e) => {
    setNewProfileImg(e.target.files[0]);
  };

  const handleFormChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.password !== formJson.passwordConfirm) {
      console.error("password is not matching");
      return;
    }
    delete formJson.passwordConfirm;

    const newUser = { profile: {} };
    Object.entries(formJson).forEach(([key, value]) => {
      if (key === "name" || key === "phoneNumber") {
        newUser.profile[key] = value;
      } else {
        newUser[key] = value;
      }
    });

    if (newProfileImg) {
      try {
        const fileId = uuidv4();
        const url = await UploadObject(
          `userProfileImg/${fileId}.png`,
          newProfileImg
        );
        // formJson['profile.profileImgUrl'] = url
        newUser.profile.profileImgUrl = url;
      } catch (e) {
        console.error(e);
      }
    }

    Accounts.createUser(newUser, (error) => {
      if (error) console.error(error);
      else FlowRouter.go("/");
    });
  };

  return (
   <>
      <Typography level="h2" textAlign="center" mb={4} mt={6} fontSize="1.5rem">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit} onChange={handleFormChange}>
        <InputProfileImg 
          image={newProfileImg}
          handleImageChange={handleImageChange}
        />

        <InputProfileInfo
          formDisplayLabel="* Email"
          name="email"
          type="text"
          icon={<AiFillMail color={theme.palette.primary[500]} />}
          // error="something is so wrong"
          required
        />

        <InputProfileInfo
          formDisplayLabel="* Name"
          name="name"
          type="text"
          icon={<FaUser color={theme.palette.primary[500]} />}
          required
        />

        <InputProfileInfo
          formDisplayLabel="* Password"
          name="password"
          type="password"
          icon={<MdLock color={theme.palette.primary[500]} />}
          required
        />

        <InputProfileInfo
          formDisplayLabel="* Password Confirm"
          name="passwordConfirm"
          type="password"
          icon={<MdLock color={theme.palette.primary[500]} />}
          required
        />

        <InputProfileInfo
          formDisplayLabel="Phone Number"
          name="phoneNumber"
          type="tel"
          icon={<FaPhone color={theme.palette.primary[500]} />}
        />

        <FlexBox justify="center" style={{ marginTop: 50 }}>
          <Button
            sx={{ width: "6rem", mr: 1 }}
            variant="outlined"
            onClick={() => FlowRouter.go("/")}
          >
            Cancel
          </Button>
          <Button sx={{ width: "6rem", mr: 1 }} type="submit">
            {" "}
            OK{" "}
          </Button>
        </FlexBox>
      </form>
    </>
  );
};
