import { Button, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { UploadObject } from "../../../s3";
import { useTracker } from "meteor/react-meteor-data";
import {
  InputProfileImg,
  InputProfileInfo,
  FlexBox,
  ChangePasswordDialog,
} from "../components";

import { v4 as uuidv4 } from "uuid";

// TODO:
// delete profile image
// form validation
// error notification
// reuseness with signup?
export default () => {
  const user = useTracker(() => Meteor.user(),[]);
  const [profileImg, setProfileImg] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.profile?.profileImgUrl) {
        setProfileImg(user.profile.profileImgUrl);
      }
    }
  }, [user]);

  // 🤔 근데 얘도 그럼 Input이 defaultValue로 안돼?
  // 어차피 loggedIn 아니면 redirection 될텐데 왜 우 왜 우 외?
  // if (!user) return <></>;

  const defaultProfile = {
    "profile.name": user.profile.name,
    "profile.phoneNumber": user.profile.phoneNumber,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let newProfile = {};

    // PROFILE
    Object.entries(defaultProfile).forEach(([key]) => {
      if (!formJson[key]) return;
      if (formJson[key] === defaultProfile[key]) return;
      newProfile[key] = formJson[key];
    });
    if (profileImg) {
      try {
        const fileId = uuidv4();
        const url = await UploadObject(
          `userProfileImg/${fileId}.png`,
          profileImg
        );
        newProfile["profile.profileImgUrl"] = url;
      } catch (e) {
        console.error(e);
      }
    } else {
      newProfile["profile.profileImgUrl"] = ""
    }

    if (Object.keys(newProfile).length === 0) return;

    setIsSubmitLoading(true);
    await Meteor.callAsync("updateUserProfile", newProfile);
    setIsSubmitLoading(false);
  };

  const handleChangeImage = ({ target }) => {
    setProfileImg(target.files[0]);
  };

  const handleDeleteImage = () => {
    setProfileImg(null)
  }

  const logout = () => {
    Meteor.logout();
    FlowRouter.go("/");
  };

  return (
    <>
      <Typography level="h2" textAlign="center" mb={4} mt={6} fontSize="1.5rem">
        Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <InputProfileImg
          image={profileImg}
          handleChangeImage={handleChangeImage}
          handleDeleteImage={handleDeleteImage}
        />

        <InputProfileInfo
          formDisplayLabel="Email"
          type="text"
          defaultValue={user.emails[0].address}
          disabled
        />

        <InputProfileInfo
          formDisplayLabel="Name"
          name="profile.name"
          type="text"
          defaultValue={defaultProfile["profile.name"]}
        />

        <InputProfileInfo
          formDisplayLabel="Phone Number"
          name="profile.phoneNumber"
          type="text"
          defaultValue={defaultProfile["profile.phoneNumber"]}
        />

        <FlexBox justify="center" style={{ marginTop: 50 }}>
          <Button
            type="button"
            sx={{ width: "6rem", mr: 1 }}
            variant="outlined"
            onClick={() => FlowRouter.go("/")}
          >
            Cancel
          </Button>
          <Button sx={{ width: "6rem", mr: 1 }} type="submit">
            {isSubmitLoading ? "Loading" : "OK"}
          </Button>
        </FlexBox>
      </form>
      <ChangePasswordDialog />
      <Button sx={{ mt: 1 }} variant="plain" onClick={logout}>
        Log out
      </Button>
    </>
  );
};
