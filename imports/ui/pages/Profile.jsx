import { Button } from "@mui/joy";
import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { UploadObject } from "../../../s3";
import { useTracker } from "meteor/react-meteor-data";
import { ProfileImg } from "../components";
import { v4 as uuidv4 } from "uuid";

// TODO: 
// delete profile image
// form validation
// error notification
// reuseness with signup?
export default () => {
  const user = useTracker(() => Meteor.user());
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  //setPassword 옵션에 logOut: true 하면 헬게이트 오픈🎉
  if (!user) return <></>;

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
    let newPassword = "";

    // PROFILE
    Object.entries(defaultProfile).forEach(([key]) => {
      if (!formJson[key]) return;
      if (formJson[key] === defaultProfile[key]) return;
      newProfile[key] = formJson[key];
    });
    if (newProfileImg) {
      try {
        const fileId = uuidv4();
        const url = await UploadObject(
          `userProfileImg/${fileId}.png`,
          newProfileImg
        );
        newProfile["profile.profileImgUrl"] = url;
      } catch (e) {
        console.error(e);
      }
    }

    // PASSWORD
    if (formJson.password && formJson.password === formJson.passwordConfirm) {
      newPassword = formJson.password;
    }
    if (Object.keys(newProfile).length === 0 && newPassword === "") return;

    setIsSubmitLoading(true);
    await Meteor.callAsync("updateUserProfile", newProfile, newPassword);
    setIsSubmitLoading(false);
  };

  // const handleFormChange = ({ target }) => {
  //   switch (target.name) {
  //     case "profile.profileImgUrl":
  
  //     default:
  //       break;
  //   }
  // };

  const handleImageChange = ({target}) =>{ 
    setNewProfileImg(target.files[0]);
  }

  const logout = () => {
    Meteor.logout();
    FlowRouter.go("/");
  };

  
  return (
    <>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit} >
        <label>
          <ProfileImg
            src={
              newProfileImg
                ? URL.createObjectURL(newProfileImg)
                : user.profile.profileImgUrl
            }
          />
          <input type="file" accept="image/*" onChange={handleImageChange}/>
        </label>

        <hr />

        <label>
          Email:
          <input
            type="text"
            defaultValue={user.emails[0].address}
            disabled
          />
        </label>

        <hr />

        <label>
          Name:
          <input
            name="profile.name"
            type="text"
            defaultValue={defaultProfile["profile.name"]}
          />
        </label>

        <hr />

        <label>
          New Password:
          <input name="password" type="password" />
          <hr />
        </label>

        <label>
          New Password Confirm:
          <input name="passwordConfirm" type="password" />
        </label>

        <hr />

        <label>
          Phone Number:
          <input
            name="profile.phoneNumber"
            type="text"
            defaultValue={defaultProfile["profile.phoneNumber"]}
          />
        </label>

        <div>
          <Button type="button"> Cancel </Button>
          <Button type="submit">{isSubmitLoading ? "Loading" : "OK"}</Button>
        </div>
      </form>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};
